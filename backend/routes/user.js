const express = require("express");
const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
const userRouter = express.Router();

userRouter.post("/signup");

userRouter.post("/signin");

module.exports = { userRouter };
