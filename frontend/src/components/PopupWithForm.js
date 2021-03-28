import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup-${props.name} popup-form popup ${
        !props.isOpen ? "" : "popup-form_showed"
      }`}
    >
      <form className="popup-form__wrapper popup-edit__form" noValidate>
        <h3 className="popup-form__title">{props.title}</h3>
        {props.children}
        <button
        style={props.isButtonHidden}
          onClick={props.onSubmit}
          type="submit"
          className={`popup-form__save-button popup-${props.submitButtonName} ${
            !props.isDisable ? "" : "popup-form__save-button_inactive"
          }`}
          onChange={props.onDisable}
        >
          {props.submitButtonText}
        </button>
        <button
          type="button"
          className="popup-form__close-button"
          onClick={props.onClose}
        ></button>
      </form>
    </section>
  );
}

export default PopupWithForm;
