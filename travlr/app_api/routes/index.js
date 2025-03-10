const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt");
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "payload"
});

const tripsController = require('../controllers/trips');
const mealsController = require('../controllers/meals');
const newsController = require('../controllers/news');
const roomsController = require('../controllers/rooms');
const authController = require('../controllers/authentication');

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

router
    .route('/news')
    .get(newsController.newsList);

router
    .route('/news/:newsCode')
    .get(newsController.newsFindCode);

router
    .route('/rooms')
    .get(roomsController.roomList);

router
    .route('/rooms/:roomCode')
    .get(roomsController.roomsFindCode);

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

module.exports = router;