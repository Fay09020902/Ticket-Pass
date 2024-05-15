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
    console.log("user", user)
    const tickets = await Ticket.findAll({
        where: { userId: user.id },
        include: {
            model: Event,
            attributes: ['name', 'date', 'time', 'city', 'address']
        }
    });

    const updatedTickets = tickets.map(ticket => {
        const { Event, ...restTicket } = ticket.toJSON();
        return {
            ...restTicket,
            eventName: Event.name,
            eventDate: Event.date,
            eventTime: Event.time,
            eventCity: Event.city,
            eventAddress: Event.address
        };
    });
    const ticketsObject = updatedTickets.reduce((obj, ticket) => {
        obj[ticket.id] = {...ticket}
        return obj;
    }, {});
    return res.json(ticketsObject);
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


// Delete a ticket
router.delete("/:ticketId", requireAuth, async (req, res, next) => {
    const { ticketId } = req.params;
    const { user } = req;


    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
        const err = new Error("Ticket couldn't be found");
        err.status = 404;
        return next(err);
    }

    // Only the owner of the ticket is authorized to delete
    if (ticket.userId !== user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    await ticket.destroy();
    return res.status(200).json({
        "message": "Successfully deleted"
    });
});

module.exports = router;
