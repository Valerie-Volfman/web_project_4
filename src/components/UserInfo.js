export default class UserInfo {
  constructor({ profileName, profileProfession }, inputAvatar) {
    this._profileName = profileName;
    this._profileProfession = profileProfession;
    this._avatar = inputAvatar;
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

  setUserAvatar(userData) {
    this._avatar = userData;
  }
}
