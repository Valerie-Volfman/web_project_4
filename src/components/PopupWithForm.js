import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popup.querySelector(".popup__save-button");
  }

  openMessage(data) {
    super.open();
    if (data) {
      this._data = data;
    }
  }

  closeMessage() {
    this.resetValues();
    this.close();
  }

  getInputValues() {
    const data = {};
    const inputList = this._formElement.querySelectorAll(".popup__input");
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  resetValues() {
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._data);
    });
  }
}
