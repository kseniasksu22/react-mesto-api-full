import PopupWithForm from "./PopupWithForm";

function InfoTooltip(props) {
  return (
    <PopupWithForm
      name="infotool"
      isOpen={props.isOpen}
      onClose={props.isUserLogged}
      isButtonHidden={{ display: "none" }}
    >
      <div className="infotool-tip">
        <img className="infotool-tip__img" alt="icon" src={props.img} />
        <p className="infotool-tip__text">{props.text}</p>
      </div>
    </PopupWithForm>
  );
}

export default InfoTooltip;
