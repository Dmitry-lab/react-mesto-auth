import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = React.useState('');
  const [placeUrl, setPlaceUrl] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [urlError, setUrlError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlaceSubmit(placeName, placeUrl)
  }

  const handleChangeName = (e) => {
    setPlaceName(e.target.value);
    if (!e.target.validity.valid)
      setNameError(e.target.validationMessage)
    else
      setNameError('')
  }

  const handleChangeUrl = (e) => {
    setPlaceUrl(e.target.value)
    if (!e.target.validity.valid)
      setUrlError(e.target.validationMessage)
    else
      setUrlError('')
  }

  React.useEffect(() => {
    setNameError('Заполните это поле');
    setUrlError('Заполните это поле');
    setPlaceName('');
    setPlaceUrl('');
  }, [props.isOpen])

  return (
    <PopupWithForm
      name="add-image"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitButtonText="Создать"
      submitAvailable={!(nameError || urlError)}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__item popup__item_type_name"
        id="input-place-name"
        type="text"
        name="place-name"
        placeholder="Название"
        minLength="2" maxLength="30"
        onChange={handleChangeName}
        value={placeName || ''}
        required
      />
      <span className={`popup__error ${nameError ? 'popup__error_visible' : ''}`} id="input-place-name-error">{nameError}</span>
      <input
        className="popup__item popup__item_type_description"
        id="input-url"
        type="url"
        name="place-link"
        placeholder="Ссылка на картинку"
        onChange={handleChangeUrl}
        value={placeUrl || ''}
        required
      />
      <span className={`popup__error ${urlError ? 'popup__error_visible' : ''}`} id="input-place-name-error">{urlError}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
