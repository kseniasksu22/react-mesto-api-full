import React from "react";
import PopupWithForm from "../components/PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
  const nameRef = React.useRef();
  const aboutRef = React.useRef();

  const [inpuNameError, setInputNameError] = React.useState(false);
  const [inputAboutError, setInputAboutError] = React.useState(false);
  const [disable, setDisable] = React.useState(false);

  const [name, setName] = React.useState("");

  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
    validateNameInput();
  }

  function handleAboutChange(e) {
    setDescription(e.target.value);
    validateAboutInput();
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setInputAboutError(true);
    setInputNameError(true);
    setDisable(false);
  }, [currentUser]);

  function handleInfoSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  function validateNameInput() {
    !nameRef.current.validity.valid
      ? setInputNameError(false) || setDisable(true)
      : setInputNameError(true) || setDisable(false);
  }
  function validateAboutInput() {
    !aboutRef.current.validity.valid
      ? setInputAboutError(false) || setDisable(true)
      : setInputAboutError(true) || setDisable(false);
  }

  return (
    <PopupWithForm
      isDisable={disable}
      name="form-edit"
      title="Редактировать профиль"
      submitButtonText=" Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleInfoSubmit}
    >
      <>
        <input
          ref={nameRef}
          placeholder={name}
          type="text"
          name="name"
          className="popup-form__input popup-form__input-name"
          required
          minLength="2"
          maxLength="40"
          onChange={handleNameChange}
        />
        <span
          className={`error ${inpuNameError ? "" : "error_active"}`}
          id="name-error"
        >
          Имя не может иметь меньше чем 2 и больше чем 40 букв
        </span>
        <input
          ref={aboutRef}
          placeholder={description}
          type="text"
          name="description"
          className="popup-form__input popup-form__input-description"
          required
          minLength="2"
          maxLength="200"
          onChange={handleAboutChange}
        />
        <span
          className={`error ${inputAboutError ? "" : "error_active"}`}
          id="description-error"
        >
          Био не может иметь меньше чем 2 и больше чем 200 букв
        </span>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
