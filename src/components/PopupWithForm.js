import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  openMessage(message) {
    super.open();
    if (message) {
      this._message = message;
      console.log(message)
    }
  }

  closeMessage() {
    this._submitButton.textContent = buttonText;
    super.close()
  }

  _getInputValues() {
    const data = {};
    const inputList = this._formElement.querySelectorAll(".popup__input");
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitButton = this._popup.querySelector(".popup__save-button");
      this._submitButton.textContent = "Saving...";
      this._handleFormSubmit(this._message);
      console.log(this.handleFormSubmit)

      this._handleFormSubmit(this._getInputValues());

      this._formElement.reset();
    });
  }
}
