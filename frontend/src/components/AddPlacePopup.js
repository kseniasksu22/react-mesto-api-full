import PopupWithForm from "./PopupWithForm";
import React from "react";
function AddPlacePopup(props) {
  const inputCardName = React.useRef();
  const inputCardLink = React.useRef();

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlacePopup({
      link: inputCardLink.current.value,
      name: inputCardName.current.value,
    });
    inputCardLink.current.value = "";
    inputCardName.current.value = "";
  }

  return (
    <PopupWithForm
      name="form-new"
      title="Новое место"
      submitButtonText=" Создать"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleAddPlaceSubmit}
    >
      <>
        <input
          ref={inputCardName}
          type="text"
          name="nameCard"
          placeholder="Название"
          className="popup-form__input popup-form-new__input-name"
          required
          minLength="1"
          maxLength="30"
        />
        <span className="error" id="nameCard-error"></span>
        <input
          ref={inputCardLink}
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup-form__input popup-form-new__input-link"
          required
        />
        <span className="error" id="link-error"></span>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
