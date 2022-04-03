export default class UserInfo {
  constructor(
    profileNameSelector,
    profileProfessionSelector,
    inputAvatarSelector
  ) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileProfession = document.querySelector(profileProfessionSelector);
    this._avatar = document.querySelector(inputAvatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      profession: this._profileProfession.textContent,
    };
    return userInfo;
  }

  setUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileProfession.textContent = userData.about;
  }

  setUserAvatar(userData) {
    this._avatar.style.backgroundImage = `url(${userData.avatar})`;
  }
}
