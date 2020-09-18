import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  const handleChangeName = (e) => {
    setName(e.target.value);
    if (!e.target.validity.valid)
      setNameError(e.target.validationMessage)
    else
      setNameError('')
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
    if (!e.target.validity.valid)
      setDescriptionError(e.target.validationMessage)
    else
      setDescriptionError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUserUpdate(name, description)
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameError('');
    setDescriptionError('');
  }, [currentUser, props.isOpen])

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      submitButtonText="Сохранить"
      onSubmit={handleSubmit}
      submitAvailable={nameError || descriptionError ? false : true}
      {...props}
    >
      <input
        className="popup__item popup__item_type_name"
        id="input-name"
        type="text"
        name="profile-name"
        placeholder="Имя"
        minLength="2" maxLength="40"
        pattern="[A-Za-zА-Яа-яЁё\s\-]*"
        required
        value={name || ''}
        onChange={handleChangeName}
      />
      <span className={`popup__error ${nameError ? 'popup__error_visible' : ''}`} id="input-name-error">{nameError}</span>
      <input
        className="popup__item popup__item_type_description"
        id="input-description"
        type="text"
        name="profile-description"
        placeholder="О себе"
        minLength="2" maxLength="200"
        required
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span className={`popup__error ${descriptionError ? 'popup__error_visible' : ''}`} id="input-description-error">{descriptionError}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
