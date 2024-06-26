const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors, validateQuery } = require('../../utils/validation');
const { Op } = require('sequelize')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Event, Post, Ticket, Seat, sequelize } = require('../../db/models');
const e = require('express');
const seat = require('../../db/models/seat');
const { validatePost } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City address is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State address is required'),
    check('lat')
        .optional()
        .isFloat({
            min: -90,
            max: 90,
          })
        .withMessage('Latitude is not valid'),
    check('lng')
        .optional()
        .isFloat({
            min: -180,
            max: 180,
          })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .isFloat({
            min: 0,
          })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReviews = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
      .exists({ checkFalsy: true })
      .isInt({
        min: 1,
        max: 5,
      })
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];


  const validateBooking = [
    check("startDate")
      .exists({ checkFalsy: true })
      .isISO8601()
      .withMessage("Enter a valid start date"),
    check("endDate")
      .exists({ checkFalsy: true })
      .isISO8601()
      .withMessage("Enter a valid end date"),
    handleValidationErrors,
  ];


//Create a event
router.post("/", requireAuth, async (req, res, next) => {
    const { user } = req;
    const seats = [];
    const generateSeatsForEvents = (rows, cols, eventIds) => {
        eventIds.forEach(eventId => {
          for (let row = 1; row <= rows; row++) {
            for (let number = 1; number <= cols; number++) {
              seats.push({
                eventId: eventId,
                row: row,
                number: number,
                isSelected: false,
                status: true,
              });
            }
          }
        });
        return seats;
      };
    const {event, seatConfig}= req.body
    const {
        name,
        artist,
        description,
        type,
        address,
        city,
        time,
        date,
        price,
        country,
        img_url,
        ticketavailability
    } = event;

    // //Can't create past time event
    // const eventDateTime = new Date(`${date}T${time}`);
    // const currentDate = new Date();
    // if (eventDateTime < currentDate) {
    //     const err = new Error("Event date must be in the future.")
    //     err.status = 404;
    //     return next(err);
    // }

    // Create the event using the Sequelize model
    const newEvent = await Event.create({
        "userId": user.id,
        name,
        artist,
        description,
        type,
        address,
        city,
        time,
        date,
        price,
        country,
        img_url,
        ticketavailability
    });

    const newSeats = generateSeatsForEvents(seatConfig.rows, seatConfig.seatsPerRow, [newEvent.id])
    await Seat.bulkCreate(newSeats);

    // Respond with the newly created event
    return res.status(201).json(newEvent);
});



//Get all Events owned by the Current User
router.get(
    "/current",
    requireAuth,
    async (req, res, next) => {
        const {user} = req
        const events = await Event.findAll(
            {
                where: {userId: user.id},
                include: {
                    model: Seat
                }
            }
        )
        // const eventsObject = events.reduce((obj, event) => {
        //     obj[event.id] = event.toJSON();  // Convert Sequelize model instance to JSON
        //     return obj;
        // }, {});
        return res.status(201).json(events);
    });

//Get details of a Event from an id
router.get(
    "/:eventId",
    async (req, res, next) => {
        const {eventId} = req.params
        const curEvent = await Event.findByPk(eventId,
                {
                    include :[
                        {
                            model: Ticket
                        },
                        {
                            model: Post,
                            // attributes: ["id", "url", "preview"]
                        },
                        {
                            model: User,
                            attributes: ["id", "firstName", "lastName"]
                        }
                    ]
                });
        if (!curEvent) {
            const err = new Error("Event couldn't be found");
            err.status = 404;
            return next(err);
        }
        return res.json(curEvent)
    });

// //Add an Image to a Spot based on the Spot's id
// router.post("/:spotId/images",
//             requireAuth,
//             async (req, res, next) => {
//                 console.log("add spot image route runs")
//                 let { url, preview } = req.body;
//                 const spotId = Number(req.params.spotId);
//                 console.log("spotid in post image: ", spotId)
//                 const { user } = req;
//                 const currSpot = await Spot.findByPk(spotId);
//                 if (!currSpot) {
//                     const err = new Error("Spot couldn't be found");
//                     err.status = 404;
//                     return next(err);
//                 }
//                  //Only the owner of the spot is authorized to edit
//         if (currSpot.ownerId !== user.id) {
//             const err = new Error("Forbidden");
//             err.status = 403;
//             return next(err);
//           }
//                 const newSpotImage = await currSpot.createSpotImage({url, preview});
//                 //const spot = await SpotImage.findOne()
//                 return res.json({
//                     id: newSpotImage.id,
//                     url: newSpotImage.url,
//                     preview: newSpotImage.preview,
//                 });
//              });


//update a event
router.put(
    "/:eventId",
    requireAuth,
    async (req, res, next) => {
        const {eventId} = req.params
        const {user} = req
        const event = await Event.findByPk(eventId)
        if (!event) {
            const err = new Error("Event couldn't be found");
            err.status = 404;
            return next(err);
        }
        //Only the owner of the event is authorized to edit
        if (event.userId !== user.id) {
            const err = new Error("Forbidden");
            err.status = 403;
            return next(err);
          }

        // //Can't update to past time event
        // const eventDateTime = new Date(`${event.date}T${event.time}`);
        // const currentDate = new Date();
        // if (eventDateTime < currentDate) {
        //     const err = new Error("Event date must be in the future.")
        //     err.status = 404;
        //     return next(err);
        // }


        const updatedEvent = await event.update(req.body);
        return res.json(updatedEvent)
    });

//delete a event
router.delete(
    "/:eventId",
    requireAuth,
    async (req, res, next) => {
        const {eventId} = req.params
        const {user} = req
        const event = await Event.findByPk(eventId)
        if (!event) {
            const err = new Error("Event couldn't be found");
            err.status = 404;
            return next(err);
        }
        //Only the owner of the event is authorized to delete
        if (event.userId !== user.id) {
            const err = new Error("Forbidden");
            err.status = 403;
            return next(err);
          }

        //check if there any tickets sold
        const tickets = await Ticket.findAll({where: {eventId}})
        if(tickets.length > 0) {
            const err = new Error("Cannot delete event with tickets sold");
            err.status = 500;
            return next(err)
        }

        // // Check if the event date is in the past
        // const currentDate = new Date();
        // const eventDate = new Date(event.date);
        // if (eventDate < currentDate) {
        //     const err = new Error("Cannot delete an event that has already occurred");
        //     err.status = 400;
        //     return next(err);
        // }

        // Proceed to delete if no tickets are sold
        await event.destroy();
        return res.json({
            "message": "Successfully deleted"
          })
    })

// //create a Review for a Spot based on the Spot's id
//   router.post(
//     "/:spotId/reviews",
//     requireAuth,
//     validateReviews,
//     async (req, res, next) => {
//         const spotId = Number(req.params.spotId);
//         const {user} = req;
//         let { review, stars  } = req.body;
//         const curSpot = await Spot.findByPk(spotId);
//         if (!curSpot) {
//             const err = new Error("Spot couldn't be found");
//             err.status = 404;
//             return next(err);
//         };
//         const review_user = await Review.findOne({
//             where: {userId: user.id, spotId: spotId}
//         })
//         if(review_user) {
//             const err = new Error("User already has a review for this spot");
//             err.status = 500;
//             return next(err);
//         }
//         const newReview = await curSpot.createReview({
//             "userId":user.id, review, stars});
//         return res.status(201).json(newReview);
//     }
// );

// //create a Booking for a Spot based on the Spot's id
// router.post(
//     "/:spotId/bookings",
//     requireAuth,
//     validateBooking,
//     async (req, res, next) => {
//         const spotId = Number(req.params.spotId);
//         const {user} = req;
//         let { startDate, endDate  } = req.body;
//         const curSpot = await Spot.findByPk(spotId);
//         if (!curSpot) {
//             const err = new Error("Spot couldn't be found");
//             err.status = 404;
//             return next(err);
//         };
//         if (curSpot.ownerId === user.id) {
//             const err = new Error("Forbidden");
//             err.status = 403;
//             return next(err);
//         }
//         const curBookings = await Booking.findAll({
//             where: {spotId: spotId}
//         })

//         if(curBookings.length) {
//             if(endDate > startDate) {
//             for (let booking of curBookings) {
//                     const start_exist = new Date(booking.startDate);
//                     const end_exist = new Date(booking.endDate);
//                     const start = new Date(startDate)
//                     const end = new Date(endDate);
//                 //dates within existing booking
//                 if(start_exist <= start && end_exist>= end) {
//                     //console.log("in this case1")
//                     const err = new Error("Sorry, this spot is already booked for the specified dates");
//                     err.status = 403;
//                     return next(err);
//                 }
//                 //start date on existing start date/end date
//                 if (start >= start_exist && start <= end_exist) {
//                     //console.log("in this case2")
//                     const err = new Error("Sorry, this spot is already booked for the specified dates");
//                     err.status = 403;
//                     err.errors = {}
//                     err.errors.startDate = "Start date conflicts with an existing booking"
//                     return next(err);
//                 }
//                 //end date on existing start date/end date
//                 if (end >= start_exist && end <= end_exist) {
//                     //console.log("in this case3")
//                     const err = new Error("Sorry, this spot is already booked for the specified dates");
//                     err.status = 403;
//                     err.errors = {}
//                     err.errors.endDate = "End date conflicts with an existing booking"
//                     return next(err);
//                 }
//                 //dates surrond existing boooking
//                 if(start>= start_exist && end >= end_exist) {
//                     //console.log("in this case4")
//                     const err = new Error("Sorry, this spot is already booked for the specified dates");
//                     err.status = 403;
//                     return next(err);
//                 }
//                 }
//             }
//             else{
//                 const err = new Error("Bad Request");
//                 err.status = 403;
//                 err.errors = {}
//                 err.errors.endDate = "endDate cannot be on or before startDate"
//                 return next(err);
//             }
//         }
//         if(endDate <= startDate) {
//             const err = new Error("Bad Request");
//             err.status = 403;
//             err.errors = {}
//             err.errors.endDate = "endDate cannot be on or before startDate"
//             return next(err);
//             }

//         const newBooking = await curSpot.createBooking({
//             "userId":user.id, startDate, endDate});
//         return res.status(201).json(newBooking);
//     }
// )



//Get all Seats by a Event's id
router.get(
    "/:eventId/seats",
    async (req, res, next) => {
        const {eventId} = req.params
        const event = await Event.findByPk(eventId)
        if (!event) {
            const err = new Error("Event couldn't be found");
            err.status = 404;
            return next(err);
        };
        const seats = await Seat.findAll({
            where: {
                eventId
            }
        })

        const seatsObject = seats.reduce((obj, seat) => {
            obj[seat.id] = seat.toJSON();  // Convert Sequelize model instance to JSON
            return obj;
        }, {});

        return res.json(seatsObject);
    });


//Get all events and querying
router.get("/", async (req, res, next) => {

    // Fetch all events from the database
    const events = await Event.findAll();

    // Respond with the list of events
    return res.status(200).json(events);

});



// create a post for an event by its eventId
router.post(
    "/:eventId/posts",
    requireAuth,
    validatePost,
    async (req, res, next) => {
      const eventId = req.params.eventId;

      // check if event exists and return error if it does not
      const event = await Event.findByPk(eventId);
      if (!event) {
        res.status(404);
        return res.json({
          message: "Unable to find an Event with that ID",
          statusCode: 404,
        });

      }
      const { userId, title, body } = req.body;
      const post = await Post.create({
          userId,
          eventId,
          title,
          body
      });
      // get the user info via the post's association, we already have event info from our first query/test
      const user = await post.getUser();
      const filteredPost = {};
      filteredPost.id = post.id;
      filteredPost.user = {
          id: user.id,
          username: user.username,
      };
      filteredPost.event = {
          id: event.id,
          name: event.name,
      };
      filteredPost.title = post.title;
      filteredPost.body = post.body;
      filteredPost.time = post.createdAt;

      res.status(201);
      return res.json({ ...filteredPost });
    }
  );




module.exports = router;
