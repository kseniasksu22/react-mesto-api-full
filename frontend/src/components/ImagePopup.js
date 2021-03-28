import React from "react";

function ImagePopup(props) {
  return (
    <section
      className={`popup-card popup ${!props.card ? "" : "popup-form_showed"}`}
    >
      <figure className="popup-card__wrapper">
        <img
          className="popup-card__image"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <figcaption className="popup-card__caption">
          {props.card ? props.card.name : ""}
        </figcaption>
        <button
          className="popup-card__button popup-form__close-button"
          onClick={props.onClose}
        ></button>
      </figure>
    </section>
  );
}

export default ImagePopup;
