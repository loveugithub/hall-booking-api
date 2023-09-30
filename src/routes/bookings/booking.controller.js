const { Op } = require("sequelize");
const Booking = require("../../models/booking.sqlite");

const { sequelize } = require("../../services/dbconfig");

exports.createBooking = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { buildingId, title, startDatetime, endDatetime } = req.body;

    const isExist = await Booking.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              {
                startDatetime: {
                  [Op.lt]: endDatetime, // Less than or equal to x
                },
              },
              {
                endDatetime: {
                  [Op.gte]: endDatetime, // Greater than or equal to x
                },
              },
            ],
          },
          {
            [Op.and]: [
              {
                startDatetime: {
                  [Op.lte]: startDatetime, // Less than or equal to x
                },
              },
              {
                endDatetime: {
                  [Op.gt]: startDatetime, // Greater than or equal to x
                },
              },
            ],
          },
          {
            [Op.and]: [
              {
                startDatetime: {
                  [Op.gt]: startDatetime, // Less than or equal to x
                },
              },
              {
                endDatetime: {
                  [Op.lte]: endDatetime, // Greater than or equal to x
                },
              },
            ],
          },
        ],

        // [Op.and]: [
        //   {
        //     [Op.or]: [
        //       {
        //         startDatetime: {
        //           [Op.lt]: startDatetime,
        //         },
        //       },
        //       {
        //         endDatetime: {
        //           [Op.gte]: startDatetime,
        //         },
        //       },
        //     ],
        //   },
        //   {
        //     [Op.or]: [
        //       {
        //         startDatetime: {
        //           [Op.lte]: endDatetime,
        //         },
        //       },
        //       {
        //         endDatetime: {
        //           [Op.gte]: endDatetime,
        //         },
        //       },
        //     ],
        //   },
        // ],
      },
    });

    console.log("isExist ", isExist);
    if (isExist) {
      await transaction.rollback();
      return res.status(400).json({
        status: "fail",
        message: "already booked",
      });
    }

    // return res.send("debugging");

    const booking = await Booking.create(
      { buildingId, title, startDatetime, endDatetime },
      { transaction }
    );
    await transaction.commit();

    res.status(201).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (err) {
    console.log("error ", err);
    await transaction.rollback();

    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};
