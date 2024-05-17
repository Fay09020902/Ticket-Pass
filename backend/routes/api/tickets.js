const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors, validateQuery } = require('../../utils/validation');
const { Op } = require('sequelize')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Event, Comment, Ticket, Seat, sequelize } = require('../../db/models');
const e = require('express');

const router = express.Router();

// Get all tickets
// Get a single ticket

// GET request to retrieve all tickets owned by the current user
router.get("/current", requireAuth, async (req, res, next) => {
    const { user } = req;
    const tickets = await Ticket.findAll({
        where: { userId: user.id },
        include: [
            { model: Event, attributes: ['artist','id','name', 'date', 'time', 'city', 'address'] },
            { model: Seat, attributes: ['row', 'number', 'id'] }
        ]
    });

    const updatedTickets = tickets.map(ticket => {
        const { Event, Seat, ...restTicket } = ticket.toJSON();
        return {
            ...restTicket,
            row: Seat.row,
            number: Seat.number,
            seatId: Seat.id,
            eventId: Event.id,
            eventName: Event.name,
            eventArtist: Event.artist,
            eventDate: Event.date,
            eventTime: Event.time,
            eventCity: Event.city,
            eventAddress: Event.address
        };
    });
    return res.json(updatedTickets);
});


// Create new tickets
router.post(
    "/",
    requireAuth,
    async (req, res, next) => {
        const { userId, eventId, seats } = req.body;
        const tickets = await Promise.all(
            seats.map(seatId =>
                Ticket.create({
                    eventId,
                    userId,
                    seatId
                })
            )
        );
        const ticketsObject = tickets.reduce((obj, t) => {
            obj[t.id] = t.toJSON();  // Convert Sequelize model instance to JSON
            return obj;
        }, {});

//         3
// :
// {id: 3, eventId: 3, userId: 2, seatId: 64, updatedAt: '2024-05-15T06:01:02.238Z', …}
// 4
// :
// {id: 4, eventId: 3, userId: 2, seatId: 65, updatedAt: '2024-05-15T06:01:02.238Z', …}


        console.log("new tcikets created: ", ticketsObject)
        return res.status(201).json(ticketsObject);
    }
);

// Update a ticket
router.put(
    "/:ticketId",
    requireAuth,
    async (req, res, next) => {
        const {ticketId} = req.params
        const {user} = req
        const ticket = await Ticket.findByPk(ticketId, {
            include: [{
                model: Event,
                attributes: ['date']
            }]
        });
        if (!ticket) {
            const err = new Error("Ticket couldn't be found");
            err.status = 404;
            return next(err);
        }
        //Only the owner of the ticket is authorized to edit
        if (ticket.userId !== user.id) {
            const err = new Error("Forbidden");
            err.status = 403;
            return next(err);
          }

        // Check if the event date allows for ticket modifications
        const now = new Date();
        const eventDate = new Date(ticket.Event.date);
        if (eventDate <= now ) {
            const err = new Error("Ticket updates are not allowed after the event start.");
            err.status = 400;
            return next(err);
        }

        const updatedTicket= await ticket.update(req.body);
        return res.json(updatedTicket)
    });

// Delete a ticket
router.delete("/:ticketId", async (req, res, next) => {
    const { ticketId } = req.params;
    const { user } = req;


   const ticket = await Ticket.findByPk(ticketId, {
        include: [{
            model: Seat
        }]
    });

    if (!ticket) {
        const err = new Error("Ticket couldn't be found");
        err.status = 404;
        return next(err);
    }
    // Only the owner of the ticket is authorized to delete
    if (ticket.userId !== user.id) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }

    //make the seat to be available status changed from false to true
    if (ticket.Seat) {
        await ticket.Seat.update({ status: true });
    }

    await ticket.destroy();
    return res.json({
        "message": "Successfully deleted"
    });
});

module.exports = router;
