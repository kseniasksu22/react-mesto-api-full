const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const rateLimit = require("express-rate-limit");
const { errors } = require("celebrate");
require("dotenv").config();
const parser = require("body-parser");
const {
  createUser,
  login,
} = require("./controllers/users");
const { loginValidator, validateUser } = require("./middlewares/validator");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const auth = require("./middlewares/auth");

const app = express();
const PORT = 3000;

const options = {
  origin: [
    "http://localhost:3000",
    "https://express-mesto-apik.nomoredomains.icu",
    "http://express-mesto-apik.nomoredomains.icu",
    "https://api.express-mesto-apik.nomoredomains.icu",
    "http://api.express-mesto-apik.nomoredomains.icu",
    "https://github.com/kseniasksu22/react-mesto-api-full.git",

  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "origin", "Authorization"],
  credentials: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20000
});

const usersRouter = require("./routes/users.js");
const cardsRouter = require("./routes/cards.js");

mongoose
  .connect("mongodb://localhost:27017/mestodb", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database");
  });
app.use("*", cors(options));
app.use(limiter);
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});
app.post("/signin", loginValidator, login);
app.post("/signup", validateUser, createUser);
app.use("/", auth, usersRouter);

app.use("/", auth, cardsRouter);

app.use(errorLogger);
app.use(errors());

app.use((req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});
app.use((err, req, res) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? "На сервере произошла ошибка"
        : message
    });
});

app.listen(PORT, () => {
  console.log(`app listen on ${PORT}`);
});
