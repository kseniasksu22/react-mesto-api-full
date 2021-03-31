const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    link: Joi.string().custom((link, errs) => {
      if (validator.isURL(link)) {
        return link;
      }
      return errs.message("Невалидный URL");
    }).required(),
  }),
});

const userInfoValidalidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    about: Joi.string().required().min(2).max(40),
  }),
});

const avatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((link, errs) => {
      if (validator.isURL(link)) {
        return link;
      }
      return errs.message("Невалидный URL");
    }).required(),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(20),
    avatar: Joi.string().custom((link, helper) => {
      if (validator.isURL(link)) {
        return link;
      } return helper.message("Невалидный URL");
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  cardValidator,
  userInfoValidalidator,
  avatarValidator,
  loginValidator,
  validateUser
};
