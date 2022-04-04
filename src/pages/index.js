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
export const popupInputName = document.querySelector(".popup__input_type_name");
export const profileName = document.querySelector(".profile__value_type_name");
export const profileProfession = document.querySelector(
  ".profile__value_type_profession"
);
export const popupInputProfession = document.querySelector(
  ".popup__input_type_profession"
);
export const popupAvatarInput = document.querySelector(".popupInputCardLink");
export const inputAvatar = document.querySelector(
  ".popup__input_type_card-link"
);

let userId = {};

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
const editSubmitButton = popupEditProfile.querySelector(".popup__save-button");
const addSubmitButton = popupAddCard.querySelector(".popup__save-button");
const removeSubmitButton = removePopupElement.querySelector(
  ".popup__save-button"
);
const avatarSubmitButton = popupAvatar.querySelector(".popup__save-button");

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
export const userInfo = new UserInfo(
  ".profile__value_type_name",
  ".profile__value_type_profession",
  ".profile__pic"
);

const editProfilePopup = new PopupWithForm(
  ".popup_type_edit-profile",
  handleProfileFormSubmit
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

const removeCardPopup = new PopupWithForm(
  ".popup_type_remove-popup",
  handleRemoveCardFormSubmit
);
removeCardPopup.setEventListeners();

const changeAvatarPopup = new PopupWithForm(
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
  try {
    const [userData, cards] = await Promise.all([
      api.getUserData(),
      api.getInitialCards(),
    ])
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userId = userData;
    cardList.render(Array.from(cards));
  } catch {
    (err) => {
      console.log(err);
    }
  }
}
init();

/**This is a description of the new Section function. */
export const cardList = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = createCard(item).render(userId);
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
    onLikeButtonClick,
    imagePopupElement
  );
}

/**Represents AddCardPopup */
async function handleAddCardFormSubmit() {
  const newCard = {
    link: addCardPopup.getInputValues().popupInputCardLink,
    name: addCardPopup.getInputValues().popupInputCardTitle,
  };
  addSubmitButton.textContent = "Saving...";
  try {
    await api.addCard(newCard.name, newCard.link).then((res) => {
      cardList.addItem(createCard(res).render(userId));
      addCardPopup.close();
    });
  } catch {
    (err) => {
      console.log(err);
    };
  }
  addSubmitButton.textContent = "Create";
}

/**Represents RemoveCardPopup */
function handleRemoveCardClick(message) {
  removeCardPopup.openMessage(message);
}

async function handleRemoveCardFormSubmit(userId) {
  removeSubmitButton.textContent = "Saving...";
  try {
    await api.removeCard(userId._id).then((res) => {
      userId.deleteCard(res);
      removeCardPopup.closeMessage();
    });
  } catch {
    (err) => {
      console.log(err);
    };
  }
  removeSubmitButton.textContent = "Yes";
}

/**Represents EditProfilePopup */
async function handleProfileFormSubmit() {
  const userData = {
    name: editProfilePopup.getInputValues().popupInputName,
    about: editProfilePopup.getInputValues().popupInputProfession,
  };
  editSubmitButton.textContent = "Saving...";
  try {
    await api.editUserData(userData.name, userData.about).then((res) => {
      userInfo.setUserInfo(userData);
      editProfilePopup.close();
      return userData;
    });
  } catch {
    (err) => {
      console.log(err);
    };
  }
  editSubmitButton.textContent = "Save";
}
/**Represents Likes */
async function onLikeButtonClick(cardData, isLiked) {
  if (isLiked) {
    try {
      await api.removeLikes(cardData).then((res) => {
        cardData.updateLikes(res);
      });
    } catch {
      (err) => {
        console.log(err);
      };
    }
  } else {
    try {
      await api.addLikes(cardData).then((res) => {
        cardData.updateLikes(res);
      });
    } catch {
      (err) => {
        console.log(err);
      };
    }
  }
}

async function handleChangeAvatarSubmit() {
  const userData = changeAvatarPopup.getInputValues();
  avatarSubmitButton.textContent = "Saving...";
  try {
    await api.editProfilePic(userData.popupInputAvatar).then((res) => {
      userInfo.setUserAvatar(res);
      changeAvatarPopup.close();
    });
  } catch {
    (err) => {
      console.log(err);
    };
  }
  avatarSubmitButton.textContent = "Save";
}

/**This is a description of the opening popups functions. */
changeAvatar.addEventListener("click", () => {
  changeAvatarPopup.open();
  changeAvatarPopup.resetValues();
});

function fillProfileForm() {
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
}

editButton.addEventListener("click", () => {
  fillProfileForm();
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
  addCardPopup.resetValues();
});
