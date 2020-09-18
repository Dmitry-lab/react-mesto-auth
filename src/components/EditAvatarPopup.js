import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputValue = React.useRef();
  const [urlError, setUrlError] = React.useState('Заполните это поле');

   const handleSubmit = (e) => {
    e.preventDefault();
    props.onAvatarUpdate(inputValue.current.value);
  }

  const handleChange = (e) => {
    e.preventDefault();
    if (!e.target.validity.valid)
      setUrlError(e.target.validationMessage)
    else
      setUrlError('')
  }

  React.useEffect(() => {
    setUrlError('Заполните это поле');
    inputValue.current.value = '';
  }, [props.isOpen])

  return (
    <PopupWithForm
      name="avatar-change"
      title="Обновить аватар"
      submitButtonText="Сохранить"
      submitAvailable={urlError ? false : true}
      onSubmit={handleSubmit}
      {...props}
    >
      <input
        className="popup__item popup__item_type_name"
        id="input-url"
        type="url"
        name="user-avatar"
        placeholder="Ссылка на аватар"
        required
        ref={inputValue}
        onChange={handleChange}
      />
      <span className={`popup__error ${urlError ? 'popup__error_visible' : ''}`} id="input-url-error">{urlError}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
