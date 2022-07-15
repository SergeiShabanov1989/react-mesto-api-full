export default function InfoTooltip(props) {
  return (
    <div className={`popup popup-tool ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup-tool__container">
        <button
          onClick={props.onClose}
          className="popup__close-btn"
          type="button">
        </button>
        <img className="popup-tool__img" alt={props.text} src={props.link}></img>
        <p className="popup-tool__text">{props.text}</p>
      </div>
    </div>
  )
}