const Sequelize = require("sequelize");

const { sequelize } = require("../services/dbconfig");

const Building = sequelize.define("Building", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Building;
