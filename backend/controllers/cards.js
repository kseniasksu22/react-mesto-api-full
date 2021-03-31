const cardModel = require("../models/card");
const NotFoundErr = require("../errors/NotFoundErr");
const BadRequestErr = require("../errors/BadRequestErr");
const ServerErr = require("../errors/ServerErr");
const ForbiddenErr = require("../errors/ForbiddenErr");

const getCards = (req, res, next) => {
  cardModel
    .find({})
    .populate("creator")
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  cardModel
    .create({ name, link, creator: req.user })
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        throw new BadRequestErr("Некорректный Url или название");
      } else {
        throw new ServerErr("Ошибка сервера");
      }
    }).catch(next);
};

const deleteCard = (req, res, next) => {
  cardModel
    .findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundErr("Карточка не найдена");
      }

      if (card.creator.toString() !== req.user._id) {
        throw new ForbiddenErr("Невозможно удалить чужую карточку");
      }
      cardModel.findByIdAndRemove(req.params.cardId)
        .then(() => {
          return res.send({ message: "Карточка удалена" });
        }).catch(next);
    }).catch(next);
};

const likeCard = (req, res, next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundErr("Карточка не найдена");
      }
      res.status(200).send(card);
    })
    .catch((error) => {
      next(error);
    });
};

const dislikeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundErr("Карточка не найдена");
      }
      return res.status(200).send(card);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
