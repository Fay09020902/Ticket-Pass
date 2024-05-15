const router = require("express").Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js');
const seatsRouter = require('./seats.js')
const ticketRouter = require('./tickets.js')
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/events', eventsRouter);
router.use('/seats', seatsRouter);
router.use('/tickets', ticketRouter);

module.exports = router;
