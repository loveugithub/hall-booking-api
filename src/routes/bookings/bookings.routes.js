const express = require("express");
const { createBooking } = require("./booking.controller");

const bookingRoute = express.Router();

/**
 * @swagger
 * /bookings:
 *  post:
 *    requestBody:
 *      description: Add new booking
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                required: true
 *              buildingId:
 *                type: string
 *              startDatetime:
 *                 type: string
 *                 example: 2023-09-30T21:00:00.223Z
 *              endDatetime:
 *                  type: string
 *                  example: 2023-09-30T21:00:00.223Z
 */
bookingRoute.post("/", createBooking);

module.exports = bookingRoute;
