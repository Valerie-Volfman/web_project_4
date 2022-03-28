export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    async getInitialCards() {
        try {
        const response = await fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
        });
          
        if (response.ok) {
            return response.json()
        } else {
            console.log("Something went wrong", response.status, response.statusText)
        }
    } catch (error) {
        console.log("CAUGHT ERROR", error);
    }
      }
      

      async getUserData() {
          try {
          const response = await fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
          });
            
          if (response.ok) {
              return response.json()
          } else {
              console.log("Something went wrong", response.status, response.statusText)
          }
        } catch (error) {
            console.log("CAUGHT ERROR", error);
        }
      }

      async editUserData() {
          try {
              const response = await fetch(`${this._baseUrl}/users/me`, {
                  method: "PATCH",
                  headers: this._headers,
                  "Content-Type": "application/json",
                  body: JSON.stringify({
                      name: "Valerie V",
                      about: "Web Developer"
                  })
              });
              if (response.ok) {
                return response.json();
            } else {
              console.log("Something went wrong", response.status, response.statusText)
            }
          } catch (error) {
              console.log("CAUGHT ERROR", error);
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
                    link: link
              })
          });

          if (response.ok) {
              return response.json();
          } else {
            console.log("Something went wrong", response.status, response.statusText)
          }
        } catch (error) {
            console.log("CAUGHT ERROR", error);
        }
      }

      async addLikes(userData) {
          try {
            const response = await fetch(`${this._baseUrl}/cards/likes/${userData._id}`, {
                method: "PUT",
                headers: this._headers,
              });
                
              if (response.ok) {
                  return response.json()
              } else {
                  console.log("Something went wrong", response.status, response.statusText)
              }
            } catch (error) {
                console.log("CAUGHT ERROR", error);
            }
          }

          async removeLikes(userData) {
            try {
              const response = await fetch(`${this._baseUrl}/cards/likes/${userData._id}`, {
                  method: "DELETE",
                  headers: this._headers,
                });
                  
                if (response.ok) {
                    return response.json()
                } else {
                    console.log("Something went wrong", response.status, response.statusText)
                }
              } catch (error) {
                  console.log("CAUGHT ERROR", error);
              }
            }
    // other methods for working with the API
  }
