import React from 'react';
import editAvatarIcon from '../images/edit-icon.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar-block" onClick={props.onEditAvatarClick}>
            <img className="profile__avatar" src={currentUser.avatar} alt="аватар пользователя" />
            <div className="profile__shadow-rect" />
            <img className="profile__edit-icon" src={editAvatarIcon} alt="иконка редактирования аватара" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="default-button profile__edit-button" type="button" onClick={props.onEditProfileClick} />
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button className="default-button profile__add-button" type="button" onClick={props.onAddPlaceLink} />
      </section>
      <section className="gallery">
        {props.cards.map(cardInfo => <Card
          key={cardInfo._id}
          card={cardInfo}
          onCardClick={props.onCardClick}
          onDeleteCardClick={props.onDeleteCardClick}
          onCardLike={props.onCardLike}
        />)}
      </section>
    </main>
  )
}

export default Main;
