import { pageSettings, popupInputName, popupInputProfession, profileName, profileProfession, popupEditProfile } from "./index.js";
import FormValidator from "./FormValidator";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._formElement = document.querySelector(popupSelector)
        .content
        .querySelector(".popup__form");
        this._handleFormSubmit = handleFormSubmit;
    }

   
    _getInputValues() {
        this._inputList = this._element.querySelectorAll(".form__input");
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
          });
    return this._formValues;
    }

    setEventListeners() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this._formElement.resetValidation();
            popupSelector.addEventListener("click", (evt) => {
                if (evt.target.classList.contains("popup__close-button")) {
                    close(popupSelector);
                }
            })
      })
}
}