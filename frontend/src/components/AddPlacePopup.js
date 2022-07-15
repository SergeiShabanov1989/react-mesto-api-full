import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState('');
  const [placeUrl, setPlaceUrl] = React.useState('');

  React.useEffect(() => {
    if (props.isOpen) {
      setPlace('')
      setPlaceUrl('')
    }
  }, [props.isOpen])

  function handlePlaceAdd(e) {
    setPlace(e.target.value)
  }

  function handlePlaceUrlAdd(e) {
    setPlaceUrl(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: place,
      link: placeUrl,
    });
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      button="Сохранить"
      name="image"
      title="Новое место"
      onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input
          onChange={handlePlaceAdd}
          type="text"
          placeholder="Название"
          value={place || ''}
          minLength="2"
          maxLength="30"
          required
          name="popup__place"
          className="popup__text popup__text_type_place"/>
        <div className="popup__text-container">
          <span className="popup__text-error popup__place-error"></span>
        </div>
      </div>
      <div className="popup__input-container">
        <input
          onChange={handlePlaceUrlAdd}
          type="url"
          placeholder="Ссылка на картинку"
          value={placeUrl || ''}
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

export default AddPlacePopup