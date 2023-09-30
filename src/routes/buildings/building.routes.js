const express = require("express");
const {
  createBuilding,
  getBuildings,
  getABuilding,
} = require("./building.controller");

const buildingRoute = express.Router();

/**
 * @swagger
 * /buildings:
 *   post:
 *    requestBody:
 *        content:
 *         application/json:
 *           schema:
 *                type: object
 *                properties:
 *                  name: string
 *    description: "cnedcde"
 *    name:
 *      type: string
 *    responses:
 *     201:
 *      description: Created
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                type: string
 *                example: success
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: uuid
 *                     description: The record ID.
 *                     example: 02d787c6-7430-4a0e-b182-8d2b490c90cb
 *                   name:
 *                     type: string
 *                     description: The building's name.
 *                     example:  Titanium Grove
 *                     updatedAt:
 *                      type: datetime
 *                      example: 2023-09-29T08:51:46.220Z
 *                     createdAt:
 *                      type: date
 *                      example: 2023-09-29T08:51:46.220Z
 *
 */
buildingRoute.post("/", createBuilding);

/**
 * @swagger
 * /buildings:
 *  get:
 *   responses:
 *    schema:
 *      type: object
 *
 */
buildingRoute.get("/", getBuildings);

/**
 * @swagger
 * /buildings/{id}:
 *  get:
 *   description: GET building datail as well as all appointment booking details
 *   parameters:
 *    - name: id
 *      in: path
 *      description: Building's ID (UUID format)
 *      required: true
 *   responses:
 *    schema:
 *      type: object
 *
 */
buildingRoute.get("/:id", getABuilding);

module.exports = buildingRoute;
