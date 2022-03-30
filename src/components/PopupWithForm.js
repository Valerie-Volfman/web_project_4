import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popup.querySelector(".popup__save-button");
  }

  openMessage(message) {
    super.open();
    if (message) {
      this._message = message;
    }
  }

  closeMessage() {
    this._submitButton.textContent = buttonText;
    super.close();
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
      this._submitButton.textContent = "Saving...";
      event.preventDefault();
      this._handleFormSubmit(this);
      console.log(this);
      this._formElement.reset();
    });
  }
}
