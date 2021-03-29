const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Unauthorized = require("../errors/Unauthorized");

const infoValues = {
  name: "Жак-Ив Кусто",
  about: "Исследователь океана",
  avatar: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png"
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 40,
    default: infoValues.name
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 40,
    default: infoValues.about
  },
  avatar: {
    type: String,
    default: infoValues.avatar,
    validate: {
      validator(link) {
        return /(http|https):\/\/\w{0,}\./.test(link);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message:
  "Неправильный формат почты",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  }
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select("+password")
    .then((user) => {
      if (!user) {
        throw new Unauthorized("Введите правильные почту или пароль");
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized("Введите правильные почту или пароль");
          }
          return user;
        });
    });
};
module.exports = mongoose.model("user", userSchema);
