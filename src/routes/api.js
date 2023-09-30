const express = require("express");

const api = express.Router();
const buildingRoute = require("./buildings/building.routes");
const bookingRoute = require("./bookings/bookings.routes");

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
api.get("/", (req, res) => res.send("<h1>Server is Running</h1>"));

// 1) building
api.use("/buildings", buildingRoute);

// 2) booking
api.use("/bookings", bookingRoute);

module.exports = api;
