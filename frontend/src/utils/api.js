class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _getHeaders() {
    return {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json"
    };
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this._getHeaders()
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject("Error, algo salió mal");
    });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this._getHeaders()
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject("Error, algo salió mal");
    });
  }

  editUserInfo(userInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(userInfo)
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject("Error, algo salió mal");
    });
  }

  createCard(cardInfo) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(cardInfo)
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject("Error, algo salió mal");
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders()
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject("Error, algo salió mal");
    });
  }

  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders()
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject("Error, algo salió mal");
    });
  }

  removeLikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders()
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject("Error, algo salió mal");
    });
  }

  editUserAvatar(userAvatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(userAvatar)
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject("Error, algo salió mal");
    });
  }
}

const api = new Api("https://arounddenise19.mooo.com");

export default api;