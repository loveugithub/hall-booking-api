const Booking = require("../../models/booking.sqlite");
const Building = require("../../models/building.sqlite");

const { sequelize } = require("../../services/dbconfig");

exports.createBuilding = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { name } = req.body;
    const building = await Building.create({ name }, { transaction });
    await transaction.commit();

    res.status(201).json({
      status: "success",
      data: {
        building,
      },
    });
  } catch (err) {
    console.log(err);
    await transaction.rollback();

    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.getBuildings = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const buildings = await Building.findAll({ transaction });
    await transaction.commit();

    res.status(200).json({
      status: "success",
      length: buildings.length,
      data: {
        buildings,
      },
    });
  } catch (err) {
    console.log(err);
    await transaction.rollback();

    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.getABuilding = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const building = await Building.findByPk(id, {
      include: [
        {
          model: Booking,
        },
      ],
      transaction,
    });

    if (!building) {
      await transaction.rollback();
      return res.status(404).json({
        status: "fail",
        message: "Building not found",
      });
    }
    await transaction.commit();

    res.status(200).json({
      status: "success",
      data: {
        building,
      },
    });
  } catch (err) {
    console.log(err);
    await transaction.rollback();

    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};
