import React from 'react';

function AgreementPopup(props) {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(props.deletedCard);
  }

  return (
    <div className={props.isOpen ? 'popup popup_opened' : 'popup'} id={`popup-${props.name}`} onClick={props.onClose}>
      <form className="popup__container" onSubmit={handleSubmit} noValidate>
        <h2 className="popup__title">{props.title}</h2>
        <button className="default-button popup__save-button" type="submit">{props.submitButtonText}</button>
        <button className="default-button popup__close-button" type="button" onClick={props.onClose} />
      </form>
    </div>
  )
}

export default AgreementPopup;
