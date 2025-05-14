const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const { userRouter } = require("./routes/user");
app.use(express.json());
console.log(process.env.MONGO_URL);

app.use("/user", userRouter);


main();
