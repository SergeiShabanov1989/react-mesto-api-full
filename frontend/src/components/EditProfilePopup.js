import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useState} from "react";

function EditProfilePopup(props) {
  const { currentUser } = React.useContext(CurrentUserContext)
  const[isButtonDisabled, setButtonDisabled] = React.useState(false);
  const [dataUser, setDataUser] = useState({
    name: '',
    occupation: ''
  });
  const [error, setError] = useState({
    name: '',
    occupation: '',
    buttonDisabled: false
  })

  React.useEffect(() => {
    setDataUser({
      name: currentUser.name || '',
      occupation: currentUser.about || ''
    });
  }, [currentUser, props.onUpdateUser]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDataUser((prev) => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }

  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "name":
          if (!value) {
            stateObj[name] = "Заполните имя";
          } else if (value < 2) {
            stateObj["name"] = "Длина не может быть меньше двух символов";
            setButtonDisabled(true);
          } else {
            stateObj["name"] = dataUser.name ? "" : error.name;
            setButtonDisabled(false);
          }
          break;

        case "occupation":
          if (!value) {
            stateObj[name] = "Заполните род деятельности";
          } else if (value < 2) {
            stateObj["occupation"] = "Длина не может быть меньше двух символов";
            setButtonDisabled(true);
          } else {
            stateObj["occupation"] = dataUser.occupation ? "" : error.occupation;
            setButtonDisabled(false);
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  }

  function handleSubmit(e) {
    const { name, occupation } = dataUser;
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: occupation
    });
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      button="Сохранить"
      name="edit"
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}>
      <div className="popup__input-container">
        <input
          type="text"
          minLength="2"
          maxLength="40"
          required
          placeholder="Имя"
          name="name"
          className="popup__text popup__text_type_name"
          onChange={handleChange}
          value={dataUser.name}
        />
        <div className="popup__text-container">
          {error.name && <span className='popup__text-error'>{error.name}</span>}
        </div>
      </div>
      <div className="popup__input-container">
        <input
          type="text"
          minLength="2"
          maxLength="200"
          required
          placeholder="Род деятельности"
          name="occupation"
          className="popup__text popup__text_type_occupation"
          onChange={handleChange}
          value={dataUser.occupation}
        />
        <div className="popup__text-container">
          {error.occupation && <span className='popup__text-error'>{error.occupation}</span>}
        </div>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup