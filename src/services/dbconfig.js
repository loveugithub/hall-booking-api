const path = require("path");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "database", "database.sqlite"),
});

const connectDB = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  // await sequelize.sync({ force: true });
  console.log("Connection has been established successfully.");
};

module.exports = { connectDB, sequelize };
