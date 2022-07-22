import React from "react";

function PopupWithForm(props) {
  React.useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [props.isOpen]);

  return (
    <>
      <div onClick={props.onClose} className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div onClick={(e) => e.stopPropagation()} className={`popup__container ${props.isOpen ? 'popup__container_active' : ''}`}>
          <button
            onClick={props.onClose}
            className={`popup__close-btn popup__close-btn_type_${props.name}`}
            type="button">
          </button>
          <form
            onSubmit={props.onSubmit}
            className={`popup__form popup__form_type_${props.name}`}
            noValidate
            name={`form_type_${props.name}`}>
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button className={`popup__button ${props.isButtonDisabled ? 'popup__button_disabled' : ''}`} type="submit">
              {props.button}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;