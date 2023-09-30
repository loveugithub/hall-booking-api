const Booking = require("../models/booking.sqlite");
const Building = require("../models/building.sqlite");

// 1) Building && Booking
// One-to-Mnay
Building.hasMany(Booking, {
  sourceKey: "id",
  foreignKey: "buildingId",
});

Booking.belongsTo(Building, {
  targetKey: "id",
  foreignKey: "buildingId",
});
