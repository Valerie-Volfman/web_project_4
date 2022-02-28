export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  setEventListeners() {
    this._closePopupButton = this._popup
      .querySelector(".popup__close-button")
      .addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup__is-opened")) {
          this.close();
        }
        if (evt.target.classList.contains("popup__close-button")) {
          this.close();
        }
      });

    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup__is-opened")) {
        this.close();
      }
    });
  }

  open() {
    this._popup.classList.add("popup__is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close = () => {
    this._popup.classList.remove("popup__is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
}
