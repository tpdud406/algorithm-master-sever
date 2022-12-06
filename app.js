const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const db = require("./config/connectDB");
const corsOptions = {
  origin: [process.env.CLIENT_HOST],
  credentials: true,
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

const app = express();
db();

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
