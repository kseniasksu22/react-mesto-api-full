const cardModel = require("../models/card");

const getCards = (req, res, next) => {
  cardModel
    .find({})
    .populate("creator")
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  cardModel
    .create({ name, link, creator: req.user._id })
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(404).send({ message: "Некорректный Url или название" });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

const deleteCard = (req, res, next) => {
  cardModel
    .findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка не найдена" });
      }

      if (card.creator.toString() !== req.user._id) {
        res.status(404).send({ message: "Невозможно удалить чужую карточку" });
      }
      cardModel.findByIdAndRemove(req.params.cardId)
        .then(() => {
          res.send({ message: "Карточка удалена" });
        });
    }).catch(next);
};

const likeCard = (req, res) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Ресурс не найден" });
        return;
      }
      res.send({ likes: card });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(400).send({ message: "Неккоректные данные" });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

const dislikeCard = (req, res) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка не найдена" });
      }
      res.send({ likes: card });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(400).send({ message: "Неккоректные данные" });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
