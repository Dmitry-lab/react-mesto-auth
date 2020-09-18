import React from 'react';

function ImagePopup(props) {
  return (
    <div className={props.card.opened ? 'popup popup_opened' : 'popup'} id="popup-image" onClick={props.onClose}>
      <figure className="popup__image-container">
        <img className="popup__image" src={props.card.src} alt={props.card.alt} />
        <figcaption className="popup__image-caption">{props.card.alt}</figcaption>
        <button className="default-button popup__close-button" type="button" onClick={props.onClose}></button>
      </figure>
    </div>
  )
}

export default ImagePopup;
