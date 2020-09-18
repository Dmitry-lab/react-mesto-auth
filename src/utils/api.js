class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status)
      })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status)
      })
  }

  changeUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
      .then(res => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status)
      })
  }

  changeAvatar(newUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: newUrl})
    })
      .then(res => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status)
      })
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
      .then(res => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status);
      })
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => {
        if (res.ok)
          return Promise.resolve()
        else
          return Promise.reject(res.status)
      })
  }

  putLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then (res => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status)
      })
  }

  deleteLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status)
      })
  }
}

const projectApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: 'ffe2a54c-a9b3-42ed-8feb-c2a6d6aa9dd2',
    'Content-Type': 'application/json'
  }
});

export default projectApi;
