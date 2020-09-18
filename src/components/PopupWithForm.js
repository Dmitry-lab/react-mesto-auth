import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={props.isOpen ? 'popup popup_opened' : 'popup'} id={`popup-${props.name}`} onClick={props.onClose}>
      <form className="popup__container" onSubmit={props.onSubmit} noValidate>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button
          className={`default-button popup__save-button ${props.submitAvailable ? '' : 'popup__save-button_disabled'}`}
          disabled={!props.submitAvailable}
          type="submit">{props.submitButtonText}
        </button>
        <button className="default-button popup__close-button" type="button" onClick={props.onClose} />
      </form>
    </div>
  )
}

export default PopupWithForm;
