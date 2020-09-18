import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import EditProfilePopup from './EditProfilePopup';
import AgreementPopup from './AgreementPopup';
import ImagePopup from './ImagePopup';
import projectApi from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setProfilePopupOpened] = React.useState(false);
  const [isAddPlacePopupOpen, setPlacePopupOpened] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpened] = React.useState(false);
  const [isAgreementAvatarOpen, setAgreementPopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ img: '', alt: '', opened: false });

  // установка состояний: Пользователь, удаляемая карточка, массив карточек
  const [currentUser, setCurrentUser] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  // установка состояния авторизации пользователя
  const [loggedIn, setLoggedIn] = React.useState(true);

  React.useEffect(() => {
    Promise.all([projectApi.getUserInfo(), projectApi.getInitialCards()])
      .then(([userInfo, cardsArr]) => {
        setCurrentUser(userInfo);
        setCards(cardsArr);
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
        alert('Ошибка подключения к серверу.')
      })
  }, []
  )

  const handleEditProfileClick = () => {
    setProfilePopupOpened(true)
  }

  const handleEditAvatarClick = () => {
    setAvatarPopupOpened(true)
  }

  const handleAddPlaceLink = () => {
    setPlacePopupOpened(true)
  }

  const handleDeleteCardClick = (card) => {
    setAgreementPopupOpened(true);
    setDeletedCard(card);
  }

  const handleCardClick = (card) => {
    setSelectedCard({ src: card.link, alt: card.name, opened: true })
  }

  const closeAllPopups = (e) => {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close-button')) {
      setProfilePopupOpened(false);
      setAvatarPopupOpened(false);
      setPlacePopupOpened(false);
      setAgreementPopupOpened(false);
      setSelectedCard({ src: '', alt: '', opened: false })
    }
  }

  //Функция замены карточек в массиве на новую
  const replaceCard = (newCard) => {
    const newCards = cards.map(card => card._id === newCard._id ? newCard : card);
    setCards(newCards);
  }

  //Обработчик нажатия кнопки "like"
  const handleCardLike = (card) => {
    if (card.likes.some(x => x._id === currentUser._id))
      projectApi.deleteLike(card._id)
        .then(newCard => replaceCard(newCard))
        .catch(err => {
          console.log(`Ошибка ${err}`);
          alert('Ошибка сервера. Повторите действие позже');
        })
    else
      projectApi.putLike(card._id)
        .then(newCard => replaceCard(newCard))
        .catch(err => {
          console.log(`Ошибка ${err}`);
          alert('Ошибка сервера. Повторите действие позже');
        })
  }

  //Обработчик подтверждения удаления карточки
  const handleSubmitCardDelete = (card) => {
    projectApi.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(x => x._id !== card._id);
        setCards(newCards);
        setAgreementPopupOpened(false);
      })
      .catch(err => {
        setAgreementPopupOpened(false)
        console.log(`Ошибка ${err}`);
        alert('Ошибка сервера. Попробуйте повторить действие позже.');
      })
  }

  //Обработчик подтверждения изменения информации пользователя
  const handleUpdateUser = (name, about) => {
    projectApi.changeUserInfo(name, about)
      .then(newInfo => {
        setCurrentUser(newInfo);
        setProfilePopupOpened(false);
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
        alert('Ошибка сервера. Попробуйте повторить действие позже.');
      })
  }

  //Обработчик изменения аватара
  const handleAvatarUpdate = (newUrl) => {
    projectApi.changeAvatar(newUrl)
      .then(newInfo => {
        setCurrentUser(newInfo);
        setAvatarPopupOpened(false);
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
        alert('Ошибка сервера. Попробуйте повторить действие позже.');
      })
  }

  //Обработчик добавления карточки
  const handleAddPlaceSubmit = (name, link) => {
    projectApi.addCard(name, link)
      .then(card => {
        setCards([card, ...cards]);
        setPlacePopupOpened(false);
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
        alert('Ошибка сервера. Попробуйте повторить действие позже.');
      })
  }

  // Компонент для отображения основной старницы
  const CardsPage = () => {
    return (
      <>
        <Header actionName="Выйти" userEmail="vlad@webref.ru" linkTo="/sign-up" />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onEditAvatarClick={handleEditAvatarClick}
          onAddPlaceLink={handleAddPlaceLink}
          onCardClick={handleCardClick}
          onDeleteCardClick={handleDeleteCardClick}
          cards={cards}
          onCardLike={handleCardLike}
        />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUserUpdate={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} />

        <AgreementPopup
          name="agreement"
          title="Вы уверены?"
          submitButtonText="Да"
          isOpen={isAgreementAvatarOpen}
          onClose={closeAllPopups}
          deletedCard={deletedCard}
          onSubmit={handleSubmitCardDelete}
        />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onAvatarUpdate={handleAvatarUpdate} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </>
    )
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path='/sign-in'>
            <Header actionName="Регистрация" userEmail="" linkTo="/sign-up" />
            <Login />
          </Route>
          <Route path='/sign-up'>
            <Header actionName="Войти" userEmail="" linkTo="/sign-in" />
            <Register />
          </Route>
          <ProtectedRoute path='/main' component={CardsPage} loggedIn={loggedIn} />
          <Route>
            {loggedIn ? <Redirect to='/main' /> : <Redirect to='/sign-in' />}
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
