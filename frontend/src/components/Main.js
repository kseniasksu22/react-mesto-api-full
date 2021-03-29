import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";
function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <button
          className="profile__button"
          onClick={props.onEditAvatar}
        ></button>
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt=" Аватарка"
        />
        <div className="profile-info">
          <div className="profile-info__wrapper">
            <h1 className="profile-info__name">{currentUser.name}</h1>
            <p className="profile-info__description">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile-info__edit-button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
          user={props.user}
            card={card}
            onCardClick={props.onCardClick}
            key={card._id}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
