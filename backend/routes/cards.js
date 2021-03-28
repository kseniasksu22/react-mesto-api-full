const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards.js");
const { cardValidator } = require("../middlewares/validator");

router.get("/cards", getCards);
router.post("/cards", cardValidator, createCard);
router.delete("/cards/:cardId", deleteCard);
router.put("/cards/likes/:cardId", likeCard);
router.delete("/cards/likes/:cardId", dislikeCard);

module.exports = router;
