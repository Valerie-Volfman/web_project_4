import {
  pageSettings,
  popupInputName,
  popupInputProfession,
  profileName,
  profileProfession,
  popupEditProfile,
} from "./index.js";
import FormValidator from "./FormValidator";
import Popup from "./Popup.js";
const popups = document.querySelectorAll(".popup");

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(".form__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
        debugger
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners() {
      super.setEventListeners();
      this._formElement.addEventListener("submit", (evt) => {
          evt.preventDefault();

          this._handleFormSubmit(this._getInputValues());

          this._formElement.reset();
      });
    }
    //   super.addEventListeners
    // super.addEventListener("submit", () => {
    //     debugger
    // //   evt.preventDefault();
    //   this._handleFormSubmit(this._getInputValues());
    //   this._formElement.resetValidation();
    //   this.close(resetValidation())
    // });

    


    // super.addEventListener("click", (evt) => {
    //   if (evt.target.classList.contains("popup__is-opened")) {
    //     this.close();
    //   }
    //   if (evt.target.classList.contains("popup__close-button")) {
    //     this.close();
    //   }
    // });

}
