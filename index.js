const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

//middlewares & routes
app.use(cors());
app.use(express.json());

//start server
app.listen(process.env.PORT, () => {
  console.log("Backend servere running");
});
