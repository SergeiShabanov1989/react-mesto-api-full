function ImagePopup(props) {
  return (
    <div className={`popup popup-image ${props.card.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup-image__container">
        <button
          onClick={props.onClose}
          className="popup__close-btn"
          type="button">
        </button>
        <img src={props.card.link} alt={props.card.name} className="popup-image__img"/>
        <p className="popup-image__title">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;