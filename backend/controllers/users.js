const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.send({ user: user });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: "Неккоректные данные" });
      }
      return res.send({ data: user });
    })
    .catch(next);
};

const getuser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Ресурс не найден" });
      }
      res.status(200).send({ user: user });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(404).send({ message: "Неккоректные данные" });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: "Неккоректные данныею Передайте правильные почту или пароль" });
  }
  User.findOne({ email }).then((data) => {
    if (data) {
      res.status(409).send({ message: "Пользователь с такой почтой уже зарегистрирован" });
    }
    return bcrypt.hash(password, 10);
  })
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      });
    })
    .then((user) => {
      // eslint-disable-next-line max-len
      res.status(201).send(
        {
          data: user
        }
      );
    })
    .catch(next);
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  console.log(req.body);
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      console.log(user);
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(404).send({ message: "Неккоректные данные" });
      } else if (error.name === "NotFound") {
        res.status(404).send({ message: "Ресурс не найден" });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(404).send({ message: "Неккоректные данные" });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: "Неккоректные данныею Передайте правильные почту или пароль" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" },
      );
      res.status(201).send({ token: token });
    })
    .catch(next);
};
module.exports = {
  getUsers,
  getuser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getCurrentUser,

};
