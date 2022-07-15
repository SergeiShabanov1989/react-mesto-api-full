import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    if (props.isOpen) {
      avatarRef.current.value = ''
    }
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      button="Сохранить"
      name="avatar"
      title="Обновить аватар"
      onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input
          ref={avatarRef}
          type="url"
          placeholder="Ссылка на аватар"
          defaultValue=""
          required
          name="popup__url"
          className="popup__text popup__text_type_url"/>
        <div className="popup__text-container">
          <span className="popup__text-error popup__url-error"></span>
        </div>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup