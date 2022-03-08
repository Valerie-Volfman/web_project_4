export default class UserInfo {
  constructor({ profileName, profileProfession }) {
    this._profileName = profileName;
    this._profileProfession = profileProfession;
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      profession: this._profileProfession.textContent,
    };
    return userInfo;
  }

  setUserInfo(popupInputName) {
    this._profileName.textContent = popupInputName.popupInputName;
    this._profileProfession.textContent = popupInputName.popupInputProfession;
  }
}
