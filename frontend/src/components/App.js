import React from "react";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from'../components/PopupWithForm'
import ImagePopup from '../components/ImagePopup'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext"
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../auth.js';
import InfoTooltip from "./InfoTooltip";
import success from "../images/succes.png";
import unsuccess from "../images/unsuccess.png";

function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
    isOpen: false
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState();
  const [isInfoTooltipSuccessOpen, setInfoTooltipSuccessOpen] = React.useState(false);
  const [isInfoTooltipUnsuccessOpen, setInfoTooltipUnsuccessOpen] = React.useState(false);
  const history = useHistory();

  function handleCardLike(likes, id) {
    const isLiked = likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === id ? newCard : c));
      })
      .catch(console.log)
  }

  function handleCardDelete(owner, id) {
    const isOwn = owner === currentUser._id;

    if (isOwn) {
      api.deleteCard(id)
        .then(() => {
          let arr = [];
          arr = cards.filter(function(card) {
            return card._id !== id;
          })
          setCards(arr)
        })
        .catch(console.log)
    }
  }

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userdata, card]) => {
        setCurrentUser(userdata)
        setCards(card)
        })
      .catch(console.log)
  }, [])

  function handleCardClick (dataFromCard) {
    setSelectedCard({
      name: dataFromCard.cardName,
      link: dataFromCard.cardLink,
      isOpen: true
    })
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }
  function handleAddPlacePopupOpen() {
    setAddPlacePopupOpen(true)
  }
  function handleEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(true)
  }
  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditProfilePopupOpen(false)
    setSelectedCard({
      name: '',
      link: '',
      isOpen: false
    })
    setInfoTooltipSuccessOpen(false)
    setInfoTooltipUnsuccessOpen(false)
  }

  function onUpdateUser(dataProfileFromInput) {
    api.editProfile(dataProfileFromInput.name, dataProfileFromInput.about)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(console.log)
  }

  function onUpdateAvatar(dataAvatarFromInput) {
    api.editAvatar(dataAvatarFromInput.avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(console.log)
  }

  function handleAddPlaceSubmit(dataCardFromInput) {
    api.addCard(dataCardFromInput.name, dataCardFromInput.link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(console.log)
  }

  const handleLogin = ({ email, password }) => {
    return auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);

          const userData = {
            email: email
          }
          setLoggedIn(true);
          setUserData(userData);
        }
      }).catch(() => {
        setInfoTooltipUnsuccessOpen(true);
      });
  }

  const handleRegister = ({ email, password }) => {
    return auth.register(email, password).then(() => {
      history.push('/signin');
      setInfoTooltipSuccessOpen(true)
    }).catch(() => {
      setInfoTooltipUnsuccessOpen(true);
      });
  }

  const tokenCheck = () => {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      auth.getContent(token).then((res) => {
        if (res) {
          const userData = {
            email: res.email
          }

          setLoggedIn(true);
          setUserData(userData);
        }
      }).catch(console.log)
    }
  }

  const signOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserData(null);
    history.push('/signin');
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <Header userData={userData} handleSignOut={signOut} />
      <Switch>
        <Route path="/signin">
          <Login handleLogin={handleLogin}></Login>
        </Route>
        <Route path="/signup">
          <Register handleRegister={handleRegister}></Register>
        </Route>
        <ProtectedRoute path="/" loggedIn={loggedIn}>
          <Main
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlacePopupOpen}
            onEditAvatar={handleEditAvatarPopupOpen}
          />
          <Footer />
        </ProtectedRoute>
        <Route>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={onUpdateUser}
      />
      <AddPlacePopup
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
      />
      <PopupWithForm
        button="Да"
        name="delete"
        title="Вы уверены?"
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={onUpdateAvatar}
      />
      <InfoTooltip
        isOpen={isInfoTooltipSuccessOpen}
        onClose={closeAllPopups}
        link={success}
        text="Вы успешно зарегистрировались!"
      />
      <InfoTooltip
        isOpen={isInfoTooltipUnsuccessOpen}
        onClose={closeAllPopups}
        link={unsuccess}
        text="Что-то пошло не так! Попробуйте ещё раз."
      />
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </CurrentUserContext.Provider>
  );
}

export default App;
