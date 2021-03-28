import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
  const inputRef = React.useRef();
  const [inpuAvatarError, setInputAvatarError] = React.useState(false);
  const [inputUrl, setInputUrl] = React.useState("");
  const [disable, setDisable] = React.useState(false);

  function handleAvatarChange(e) {
    setInputUrl(e.target.value);
    validateAvatar();
  }

  function handleAvatarSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
    inputRef.current.value = "";
  }

  function validateAvatar() {
    inputRef.current.validity.valid
      ? setInputAvatarError(false) || setDisable(false)
      : setInputAvatarError(true) || setDisable(true);
  }

  return (
    <PopupWithForm
      isDisable={disable}
      value={inputUrl}
      name="form-avatar"
      title="Обновить аватар"
      submitButtonText=" Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAvatarSubmit}
    >
      <>
        <input
          ref={inputRef}
          type="url"
          name="avatar"
          className="popup-form__input popup-form-avatar__input"
          placeholder="Ссылка на картинку"
          onChange={handleAvatarChange}
          required
        />
        <span
          className={`error ${!inpuAvatarError ? "" : "error_active"}`}
          id="linkAvatar-error"
        >
          Вставьте, пожалуйста, ссылку на картинку
        </span>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
