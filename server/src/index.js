require("dotenv").config();
const express = require("express");

const financierController = require("./controllers/financier.controller");
const app = express();

app.use(express.json());

app.use("/financiers", financierController);

module.exports = app;
