import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({link, name, likes, owner, _id,  onCardClick, onCardLike, onCardDelete}) {
  const { currentUser } = useContext(CurrentUserContext)
  const isOwn = owner.toString() === currentUser._id;
  const cardDeleteButtonClassName = (
    `elements__trash ${isOwn ? 'elements__trash_active' : ''}`
  );
  const isLiked = likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `elements__heart ${isLiked ? 'elements__heart_active' : ''}`
  );

  function handleClick() {
    const cardData = {
      cardName: name,
      cardLink: link
    }
    onCardClick(cardData)
  }

  function handleLikeClick() {
    onCardLike(likes, _id)
  }

  function handleDeleteClick() {
    onCardDelete(owner, _id)
  }

  return (
    <div className="elements__element">
      <img onClick={handleClick} src={link} alt={name} className="elements__image"/>
      <button
        onClick={handleDeleteClick}
        className={`${cardDeleteButtonClassName}`}
        type="button">
      </button>
      <div className="elements__discription">
        <h2 className="elements__text">{name}</h2>
        <div className="elements__discription-wrapper">
          <button
            onClick={handleLikeClick}
            className={`${cardLikeButtonClassName}`}
            type="button">
          </button>
          <span className="elements__heart-count">{likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;