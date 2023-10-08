const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const apiRouter = require("./routes/apiRouter");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/", apiRouter);

app.use("/", express.static(path.join(__dirname, "../frontend/build")));

module.exports = app;
