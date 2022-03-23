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

  setUserInfo(userData) {
    this._profileName.textContent = userData.popupInputName;
    this._profileProfession.textContent = userData.popupInputProfession;
  }
}
