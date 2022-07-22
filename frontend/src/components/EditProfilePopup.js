import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useState} from "react";

function EditProfilePopup(props) {
  const { currentUser } = React.useContext(CurrentUserContext)
  // const [name, setName] = React.useState('');
  // const [description, setDescription] = React.useState('');
  const [dataUser, setDataUser] = useState({
    name: '',
    occupation: ''
  });
  const [error, setError] = useState({
    name: '',
    occupation: ''
  })

  React.useEffect(() => {
    setDataUser({
      name: currentUser.name || '',
      occupation: currentUser.about || ''
    });
  }, [currentUser, props.onUpdateUser]);

  // function handleNameEdit(e) {
  //   setName(e.target.value)
  // }
  //
  // function handleDescriptionEdit(e) {
  //   setDescription(e.target.value)
  // }

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
          } else if (dataUser.name.length < 1) {
            stateObj["name"] = "Длина не может быт меньше двух символов";
          } else {
            stateObj["name"] = dataUser.name ? "" : error.name;
          }
          break;

        case "occupation":
          if (!value) {
            stateObj[name] = "Заполните род деятельности";
          } else if (dataUser.occupation.length < 1) {
            stateObj["occupation"] = "Длина не может быт меньше двух символов";
          } else {
            stateObj["occupation"] = dataUser.occupation ? "" : error.occupation;
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
      onSubmit={handleSubmit}>
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