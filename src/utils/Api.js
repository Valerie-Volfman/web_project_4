export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async getUserData() {
    try {
      const response = await fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      }).then(this._getResponseData(response));
    } finally {
      console.log("finally");
    }
  }

  async editUserData(name, about) {
    try {
      const response = await fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        "Content-Type": "application/json",
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      }).then(this._getResponseData(response));
    } finally {
      console.log("finally");
    }
  }

  async getInitialCards() {
    try {
      const response = await fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      }).then(this._getResponseData(response));
    } finally {
      console.log("finally");
    }
  }

  async addCard(name, link) {
    try {
      const response = await fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        "Content-Type": "application/json",
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      }).then(this._getResponseData(response));
    } finally {
      console.log("finally");
    }
  }

  async addLikes(userData) {
    try {
      const response = await fetch(
        `${this._baseUrl}/cards/likes/${userData._id}`,
        {
          method: "PUT",
          headers: this._headers,
        }
      ).then(this._getResponseData(response));
    } finally {
      console.log("finally");
    }
  }

  async removeLikes(userData) {
    try {
      const response = await fetch(
        `${this._baseUrl}/cards/likes/${userData._id}`,
        {
          method: "DELETE",
          headers: this._headers,
        }
      ).then(this._getResponseData(response));
    } finally {
      console.log("finally");
    }
  }

  async removeCard(userData) {
    try {
      const response = await fetch(`${this._baseUrl}/cards/${userData}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getResponseData(response));
    } finally {
      console.log("finally");
    }
  }

  async editProfilePic(avatar) {
    try {
      const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        "Content-Type": "application/json",
        body: JSON.stringify({
          avatar: `${avatar}`,
        }),
      }).then(this._getResponseData(response));
    } finally {
      console.log("finally");
    }
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
