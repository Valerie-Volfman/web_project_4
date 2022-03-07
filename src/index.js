import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import "../src/pages/index.css";
import logo from "./images/Logo.svg";
import PopupWithImage from "./components/Popupwithimage.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
//Wrappers
export const imagePopup = document.querySelector(".popup_type_image-popup");
export const popupImage = new PopupWithImage(".popup_type_image-popup");

popupImage.setEventListeners();

export const placesCards = document.querySelector(".places__cards");
export const popupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
);
export const popupAddCard = document.querySelector(".popup_type_add-card");

//DOM elements
export const cardTemplateSelector = "#card-template";
export const profileName = document.querySelector(".profile__value_type_name");
export const profileProfession = document.querySelector(
  ".profile__value_type_profession"
);
export const popupInputName = document.querySelector(".popup__input_type_name");

export const popupInputProfession = document.querySelector(
  ".popup__input_type_profession"
);

//Buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const pageSettings = {
  formElement: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//Validators
export const editFormValidator = new FormValidator(
  pageSettings,
  popupEditProfile
);
export const addFormValidator = new FormValidator(pageSettings, popupAddCard);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

export const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item).render();

      cardList.addItem(card);
    },
  },
  placesCards
);
cardList.render();

// function for creating a new card
export function createCard(cardElement) {
  return new Card(cardElement, cardTemplateSelector, popupImage.open);
}

export const addCardPopup = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

function handleAddCardFormSubmit() {
  const newCard = {
    link: addCardPopup._formValues.popupInputCardLink,
    name: addCardPopup._formValues.popupInputCardTitle,
  };
  const card = createCard(newCard).render();
  cardList.addItem(card);
  addCardPopup.close();
}
//for editProfilePopup
export const userInfo = new UserInfo({ profileName, profileProfession });

export const editProfilePopup = new PopupWithForm(
  ".popup_type_edit-profile",
  handleProfileFormSubmit
);
editProfilePopup.setEventListeners();

function handleProfileFormSubmit() {

  userInfo.setUserInfo(editProfilePopup._formValues);
  editProfilePopup.close();
}

// for opening popups***
editButton.addEventListener("click", () => {
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
});

export { pageSettings };
export const popupPic = imagePopup.querySelector(".popup__image");
export const popupImageTitle = imagePopup.querySelector(".popup__image-title");
