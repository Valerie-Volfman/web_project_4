export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    async getInitialCards() {
        const response = await fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
        });
          
        if (response.ok) {
            return response.json()
        } else {
            console.log("Something went wrong", response.status, response.statusText)
        }
      }
      

      async getUserData() {
          const response = await fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
          });
            
          if (response.ok) {
              return response.json()
          } else {
              console.log("Something went wrong", response.status, response.statusText)
          }
      }

      async addCard(name, link) {
          const response = await fetch(`${this._baseUrl}/cards`, {
              method: "POST",
              headers: this._headers,
              "Content-Type": "application/json",
              body: JSON.stringify({
                    name: name,
                    link: link
              })
          });

          if (response.ok) {
              return response.json();
          } else {
            console.log("Something went wrong", response.status, response.statusText)
          }
      }
    // other methods for working with the API
  }
