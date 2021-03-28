import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  
  const currentUser = React.useContext(CurrentUserContext);
const isOwn = (props.card.creator._id || props.card.creator) === currentUser._id;

  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "element__delete" : "element__delete_inactive"
  }`;
  let isLiked = props.card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_clicked" : "element__like"
  }`;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <div className="element">
      <img
        className="element__image"
        src={props.card.link}
        alt=""
        onClick={handleClick}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        alt={props.card.name}
      />
      <div className="element__wrapper">
        <h2 className="element__caption">{props.card.name}</h2>
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        ></button>
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <div className="element__like-counter">{props.card.likes.length}</div>
      </div>
    </div>
  );
}

export default Card;
