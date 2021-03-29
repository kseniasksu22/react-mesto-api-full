/* eslint-disable eqeqeq */
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import { register, login, getContent } from "../utils/MestoAuth";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../context/CurrentUserContext";
import InfoTooltip from "./InfoTooltip";
import doneIcon from "../../src/images/Union.svg";
import rejectIcon from "../../src/images/Union (1).svg";

function App() {
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState({
    isOpen: false,
    popupImg: "",
    popupText: "",
  });

  const [selectedCard, setselectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const escCode = 27;
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  
    React.useEffect(() => {
      if (loggedIn) {
        const token = getTokens();
    Promise.all([api.getUserInfo(token), api.getAllCards(token)])
      .then((values) => {
        const [userData, initialCards] = values;
        setCards(initialCards);
        setCurrentUser(userData.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/main");
    }
  }, [loggedIn, history]);

  function handleCardLike(card) {
    let isLiked = card.likes.some((i) => 
      i == currentUser._id
    );

    function requestLike(newCard) {
      const newCards = cards.map((c) =>
      (c._id === card._id ? newCard : c));
      setCards(newCards);
    }
    if (!isLiked) {
      api
        .putLike(card._id, getTokens())
        .then(requestLike)
        .catch((err) => {
          console.error(err);
        });
    } else {
      api
        .deleteLike(card._id, getTokens())
        .then(requestLike)
        .catch((err) => {
          console.error(err);
        });
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, [history, tokenCheck]);

  function handleCardDelete(card) {
    api
      .deleteCard(card._id, getTokens())
      .then(() => {
        const newCard = cards.filter((item) => item !== card);
        setCards(newCard);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getTokens(){
    return localStorage.getItem("token");
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setselectedCard(card);
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditProfilePopupOpen(false);
    setselectedCard(null);
    setIsConfirmPopupOpen(false);
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data, getTokens())
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .getAvatarInfo(data, getTokens())
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleSubmitCard(data) {
    api
      .postNewCard(data, getTokens())
      .then((data) => {
        setCards([data.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function escHandle(e) {
    if (e.keyCode === escCode) {
      closeAllPopups();
    }
  }
  function closeByOverlay(e) {
    if (e.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", escHandle);
    document.addEventListener("mousedown", closeByOverlay);
    return () => {
      document.removeEventListener("keydown", escHandle);
      document.removeEventListener("mousedown", closeByOverlay);
    };
  });

  function handleRegister(email, password) {
    register(email, password)
      .then((res) => {
        if (res) {
          setIsConfirmPopupOpen({
            isOpen: true,
            popupImg: doneIcon,
            popupText: "Вы успешно зарегистрировались",
          });
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        // eslint-disable-next-line eqeqeq
        if (err == 400) {
          console.log("Неккоректно заполнено одно из полей.");
        }
        setIsConfirmPopupOpen({
          isOpen: true,
          popupImg: rejectIcon,
          popupText: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  function handleLogin(email, password) {
    setIsConfirmPopupOpen(true);
    login(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem("token", data.token);
          history.push("/main");
        }
      })
      .catch((err) => {
        if (err == 400) {
          console.log("Не передано одно из полей.");
        } else if (err == 401) {
          console.log("пользователь с email не найден");
        }
        setIsConfirmPopupOpen({
          isOpen: true,
          popupImg: rejectIcon,
          popupText: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push("/main");
          }
        })
        .catch((error) => {
          if (error == 400) {
            console.log("Переданный токен некорректен");
          } else if (error == 401) {
            console.log("Токен не передан или передан не в том формате");
          }
        });
    }
  }

  function signOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/signin");
  }

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} click={signOut} />
        <Switch>
          <ProtectedRoute
            path="/main"
            email={email}
            click={signOut}
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          ></ProtectedRoute>

          <Route path="/signup">
            <Register
              handleRegister={handleRegister}
              onLogin={() => {
                history.push("/signin");
              }}
            />
          </Route>

          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
          <Route path="*">
            <Redirect to="/signin" />
          </Route>
        </Switch>
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlacePopup={handleSubmitCard}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name="deleted-card"
          title="Вы уверены?"
          submitButtonText=" Да"
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
        isOpen={isConfirmPopupOpen.isOpen}
        isUserLogged={closeAllPopups}
        img={isConfirmPopupOpen.popupImg}
        text={isConfirmPopupOpen.popupText}
      />
      <Footer />
    </div>
  );
}

export default App;
