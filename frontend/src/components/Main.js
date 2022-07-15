import {useContext} from "react";
import editCard from '../images/editCard.svg'
import vector from '../images/vector.svg'
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
  const { currentUser } = useContext(CurrentUserContext)

  return (
    <>
      <main className="content">
        <section className="profile content__profile">
          <div className="profile__info">
            <div className="profile__wrapper">
              <img
                src={currentUser.avatar}
                alt="твой аватар"
                className="profile__avatar"/>
              <div className="profile__edit-overlay" onClick={props.onEditAvatar}>
                <img src={editCard} className="profile__edit-img" alt="Изменить аватар"/>
              </div>
            </div>
            <div className="profile__input">
              <div className="profile__cover-text">
                <h1 className="profile__input-name">{currentUser.name}</h1>
                <button
                  type="button"
                  className="profile__button"
                  onClick={props.onEditProfile}>
                </button>
              </div>
              <p className="profile__input-occupation">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={props.onAddPlace}>
            <img
              className="profile__add-button-img"
              src={vector}
              alt="кнопка добавить изоражение"/>
          </button>
        </section>
        <section className="elements content__elements">
        </section>
      </main>
      <section className="elements content__elements">
        {
        props.cards.map((card) => (
          <Card
            {...card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}/>
        ))
        }
      </section>
    </>
  );
}

export default Main;