export default class UserInfo {
  constructor({ profileName, profileProfession }) {
    this._profileName = profileName;
    this._profileProfession = profileProfession;
  }

  getUserInfo() {
    this._formValues = {
      name: this._profileName.textContent,
      profession: this._profileProfession.textContent,
    };
    return this._formValues;
  }

  setUserInfo(popupInputName) {
    this._profileName.textContent = popupInputName.popupInputName;
    this._profileProfession.textContent = popupInputName.popupInputProfession;
  }
}
