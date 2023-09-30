const Sequelize = require("sequelize");

const { sequelize } = require("../services/dbconfig");

const Booking = sequelize.define("Booking", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  buildingId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  startDatetime: {
    type: Sequelize.DATE,
    allowNull: false,

    validate: {
      fun(val) {
        const value = val.toISOString();
        const curr = new Date().toISOString();

        if (value <= curr) {
          throw new Error("startDatetime must be future value");
        }
      },
    },
  },
  endDatetime: {
    type: Sequelize.DATE,
    allowNull: false,

    validate: {
      fun(val) {
        const value = val.toISOString();
        const curr = new Date().toISOString();
        const startDate = this.startDatetime.toISOString();

        if (value < curr) {
          throw new Error("endDatetime must be future value");
        }
        if (value <= startDate) {
          throw new Error("endDatetime must be greater than startDatetime");
        }
      },
    },
  },
});

module.exports = Booking;
