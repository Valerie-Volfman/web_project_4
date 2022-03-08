import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputList = this._formElement.querySelectorAll(".popup__input");
    const formValues = {};
    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());

      this._formElement.reset();
    });
  }
}
