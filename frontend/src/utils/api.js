import { BASE_URL } from '../auth'

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  }

  _headerWithJwt() {
    return {authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers}
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headerWithJwt()
    })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headerWithJwt()
    })
      .then(this._checkResponse)
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headerWithJwt(),
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._checkResponse)
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headerWithJwt(),
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headerWithJwt()
    })
      .then(this._checkResponse)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headerWithJwt()
    })
      .then(this._checkResponse)
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headerWithJwt()
    })
      .then(this._checkResponse)
  }

  changeLikeCardStatus(id, like) {
    this.methodName = like ? "PUT" : "DELETE";
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: this.methodName,
      headers: this._headerWithJwt()
    })
      .then(this._checkResponse)
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headerWithJwt(),
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._checkResponse)
  }
}

export const api = new Api({
  baseUrl:  BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
});