import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const { currentUser } = React.useContext(CurrentUserContext)
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, props.onUpdateUser]);

  function handleNameEdit(e) {
    setName(e.target.value)
  }

  function handleDescriptionEdit(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      button="Сохранить"
      name="edit"
      title="Редактировать профиль"
      onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input
          type="text"
          minLength="2"
          maxLength="40"
          required
          placeholder="Имя"
          name="popup__name"
          className="popup__text popup__text_type_name"
          onChange={handleNameEdit}
          value={name}
        />
        <div className="popup__text-container">
          <span className="popup__text-error popup__name-error"></span>
        </div>
      </div>
      <div className="popup__input-container">
        <input
          type="text"
          minLength="2"
          maxLength="200"
          required
          placeholder="Род деятельности"
          name="popup__occupation"
          className="popup__text popup__text_type_occupation"
          onChange={handleDescriptionEdit}
          value={description}
        />
        <div className="popup__text-container">
          <span className="popup__text-error popup__occupation-error"></span>
        </div>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup