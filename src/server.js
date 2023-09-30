const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const { connectDB } = require("./services/dbconfig");
const app = require("./app");

const PORT = process.env.PORT;
console.log(PORT);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server listening at port ${PORT}...`));
  } catch (err) {
    console.log(err);
    console.log("server failed to start");
  }
};

startServer();
