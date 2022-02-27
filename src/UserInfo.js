import {profileName, profileProfession, popupInputName, popupInputProfession} from "./index.js";

export default class UserInfo {
    constructor(profileName, profileProfession) {
        this.profileName = profileName;
        this.profileProfession = profileProfession;
    }

    getUserInfo() {
        this._inputList = this._formElement.querySelectorAll(".form__input");
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.value] = input.name;
          });
          return this._formValues;
    }

    setUserInfo() {
        this.profileName.textContent = popupInputName.value;
         this.profileProfession.textContent = popupInputProfession.value;

         return this._formValues;
    }
}