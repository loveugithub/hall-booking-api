const path = require("path");

const cors = require("cors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const api = require("./routes/api");
require("./associations/building.association");

const app = express();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "routes", "*", "*.routes.js")],
};
const swaggerSpec = swaggerJsdoc(options);

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/tmp", (req, res) => res.send("dndjkvnvnv"));
app.use("/api/v1", api);

module.exports = app;
