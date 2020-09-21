import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Img } from 'react-image';
import imageError from '../images/no-image.svg';

const Card = React.memo((props) => {

  const handleCardClick = () => props.onCardClick(props.card);
  const hadleCardLike = () => props.onCardLike(props.card);
  const handleDeleteCard = () => props.onDeleteCardClick(props.card);

  const currentUser = React.useContext(CurrentUserContext);
  const didUserLiked = props.card.likes.some(x => x._id === currentUser._id);

  return (
    <figure className="card">
      <Img
        className="card__image"
        src={props.card.link}
        unloader={<p className="card__info">Извините, изображение не загружено</p>}
        alt={props.card.name}
      />
      <div className="card__shadow-rect" data-url={props.card.link} data-alt={props.card.name} onClick={handleCardClick} />
      <figcaption className="card__caption-content">
        <p className="card__caption">{props.card.name}</p>
        <div className="card__likes-block">
          <button className={`default-button card__like-button ${didUserLiked ?
            'card__like-button_checked' : ''}`} type="button" onClick={hadleCardLike}/>
          <span className="card__likes-counter">{props.card.likes.length}</span>
        </div>
        <button className={`default-button card__delete-button ${currentUser._id === props.card.owner._id ?
          '' : 'card__delete-button_hidden'}`} type="button" onClick={handleDeleteCard}/>
      </figcaption>
    </figure>
  );
})

export default Card;
