export default class UserInfo {
  constructor({ profileName, profileProfession }) {
    this._profileName = profileName;
    this._profileProfession = profileProfession;
  }

  getUserInfo() {
    this._inputList = this._formElement.querySelectorAll(".form__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.value] = input.textContent;
    });
    return this._formValues;
  }

  setUserInfo(popupInputName) {
    this._profileName.textContent = popupInputName.popupInputName;
    this._profileProfession.textContent = popupInputName.popupInputProfession;
  }
}
