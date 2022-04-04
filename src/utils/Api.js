export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async getUserData() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });

    return this._getResponseData(response);
  }

  async editUserData(name, about) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      "Content-Type": "application/json",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });

    return this._getResponseData(response);
  }

  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });

    return this._getResponseData(response);
  }

  async addCard(name, link) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      "Content-Type": "application/json",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });

    return this._getResponseData(response);
  }

  async addLikes(userData) {
    const response = await fetch(
      `${this._baseUrl}/cards/likes/${userData._id}`,
      {
        method: "PUT",
        headers: this._headers,
      }
    );

    return this._getResponseData(response);
  }

  async removeLikes(userData) {
    const response = await fetch(
      `${this._baseUrl}/cards/likes/${userData._id}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    );

    return this._getResponseData(response);
  }

  async removeCard(userData) {
    const response = await fetch(`${this._baseUrl}/cards/${userData}`, {
      method: "DELETE",
      headers: this._headers,
    });

    return this._getResponseData(response);
  }

  async editProfilePic(avatar) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      "Content-Type": "application/json",
      body: JSON.stringify({
        avatar: `${avatar}`,
      }),
    });

    return this._getResponseData(response);
  }

  _getResponseData(response) {
    if (!response.ok) {
      return Promise.reject(
        "Something went wrong",
        response.status,
        response.statusText
      );
    }

    return response.json();
  }
}
