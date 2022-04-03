import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import logo from "../images/Logo.svg";
import profileIcon from "../images/Avatar.svg";
import PopupWithImage from "../components/Popupwithimage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { pageSettings } from "../utils/constants.js";
import Api from "../utils/Api";
import Popup from "../components/Popup.js";

/**Wrappers */
export const placesList = document.querySelector(".places__cards");

/**DOM elements */

export const cardTemplateSelector = "#card-template";
export const profileName = document.querySelector(".profile__value_type_name");
export const profileProfession = document.querySelector(
  ".profile__value_type_profession"
);
export const popupInputName = document.querySelector(".popup__input_type_name");

export const popupInputProfession = document.querySelector(
  ".popup__input_type_profession"
);
export const popupAvatarInput = document.querySelector(".popupInputCardLink");
export const inputAvatar = document.querySelector(
  ".popup__input_type_card-link"
);
const submitButton = document.querySelector(".popup__save-button");

let newUserData = {};

/**Popups */
export const popupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
);
export const popupAddCard = document.querySelector(".popup_type_add-card");
export const imagePopupElement = document.querySelector(
  ".popup_type_image-popup"
);
export const removePopupElement = document.querySelector(
  ".popup_type_remove-popup"
);
export const popupAvatar = document.querySelector(".popup_type_avatar-popup");
export const imagePopup = new PopupWithImage(".popup_type_image-popup");
imagePopup.setEventListeners();

/**Buttons */
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const changeAvatar = document.querySelector(".profile__pic-wrapper");

/**Validators */
export const editFormValidator = new FormValidator(
  pageSettings,
  popupEditProfile
);
export const addFormValidator = new FormValidator(pageSettings, popupAddCard);

export const changeAvatarValidator = new FormValidator(
  pageSettings,
  popupAvatar
);
changeAvatarValidator.enableValidation();
editFormValidator.enableValidation();
addFormValidator.enableValidation();
/**Popups Instances */
export const userInfo = new UserInfo({ profileName, profileProfession });

export const editProfilePopup = new PopupWithForm(
  ".popup_type_edit-profile",
  handleProfileFormSubmit
);
editProfilePopup.setEventListeners();

export const addCardPopup = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

export const removeCardPopup = new PopupWithForm(
  ".popup_type_remove-popup",
  handleRemoveCardFormSubmit
);
removeCardPopup.setEventListeners();

export const changeAvatarPopup = new PopupWithForm(
  ".popup_type_avatar-popup",
  handleChangeAvatarSubmit
);
changeAvatarPopup.setEventListeners();

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "2911a1a5-67c1-4d46-aa09-949272fd93e2",
    "Content-Type": "application/json",
  },
});
/**Initial data */
async function init() {
  const [userData, cards] = await Promise.all([
    api.getUserData(),
    api.getInitialCards(),
  ]);
  userInfo.setUserInfo({
    popupInputName: userData.name,
    popupInputProfession: userData.about,
  });
  userInfo.setUserAvatar({ inputAvatar: userData.avatar });
  newUserData = userData;
  console.log({ inputAvatar: userData.avatar });
  cardList.render(Array.from(cards));
  return userData, cards;
}
init();

/**This is a description of the new Section function. */
export const cardList = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = createCard(item).render(newUserData);
      cardList.addItem(card);
    },
  },
  placesList
);

/**This is a description of the createCard function. */
export function createCard(cardElement) {
  return new Card(
    cardElement,
    cardTemplateSelector,
    imagePopup.open,
    handleRemoveCardClick,
    onLikeButtonClick
  );
}

/**Represents AddCardPopup */
async function handleAddCardFormSubmit() {
  const newCard = {
    link: addCardPopup._getInputValues().popupInputCardLink,
    name: addCardPopup._getInputValues().popupInputCardTitle,
  };
  await api
    .addCard(newCard.name, newCard.link)
    .then((res) => {
      cardList.addItem(createCard(res).render());
    })
    .catch((err) => {
      console.log(err);
    });

  addCardPopup.close();
}
/**Represents RemoveCardPopup */
function handleRemoveCardClick(message) {
  removeCardPopup.openMessage(message);
}

async function handleRemoveCardFormSubmit(data) {
  console.log(data);
  await api.removeCard(data._id).then((res) => {
    data.deleteCard(res);
    removeCardPopup.closeMessage("Yes");
  });
}

/**Represents EditProfilePopup */
async function handleProfileFormSubmit() {
  const userData = {
    name: editProfilePopup._getInputValues().popupInputName,
    about: editProfilePopup._getInputValues().popupInputProfession,
  };
  await api.editUserData(userData.name, userData.about).then((res) => {
    console.log(res);
    userInfo.setUserInfo({
      popupInputName: userData.name,
      popupInputProfession: userData.about,
    });
    editProfilePopup.close();
    return userData;
  });
}
/**Represents Likes */
async function onLikeButtonClick(cardData, isLiked) {
  if (isLiked) {
    await api.removeLikes(cardData).then((res) => {
      console.log(cardData);
      console.log(res);
      cardData.updateLikes(res);
    })
  } else {
    await api.addLikes(cardData).then((res) => {
      console.log(cardData);
      console.log(res);
      cardData.updateLikes(res);
    })
  }
}

async function handleChangeAvatarSubmit() {
  const userData = {
    avatar: changeAvatarPopup._getInputValues().inputAvatar,
  };
  await api.editProfilePic(userData.avatar).then((res) => {
    userInfo.setUserAvatar(res);
    console.log(res);
    changeAvatarPopup.close();
  });
}

/**This is a description of the opening popups functions. */
changeAvatar.addEventListener("click", () => {
  changeAvatarPopup.open();
  changeAvatarPopup.resetValues();
});

editButton.addEventListener("click", () => {
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
  addCardPopup.resetValues();
});

export const popupPic = imagePopupElement.querySelector(".popup__image");
export const popupImageTitle = imagePopupElement.querySelector(
  ".popup__image-title"
);
