import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";
const initialCards = [
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
export const popupImage = document.querySelector(".popup_type_image-popup");
const placesCards = document.querySelector(".places__cards");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const addCardForm = popupAddCard.querySelector(".popup__form");
const editProfileForm = popupEditProfile.querySelector(".popup__form");

//DOM elements
const cardTemplateSelector = "#card-template";
const profileName = document.querySelector(".profile__value_type_name");
const profileProfession = document.querySelector(
  ".profile__value_type_profession"
);
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputProfession = document.querySelector(
  ".popup__input_type_profession"
);
const popupInputCardTitle = document.querySelector(
  ".popup__input_type_card-title"
);
const popupInputCardLink = document.querySelector(
  ".popup__input_type_card-link"
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
const editFormValidator = new FormValidator(pageSettings, popupEditProfile);
const addFormValidator = new FormValidator(pageSettings, popupAddCard);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//function for creating a new card
function createCard(cardElement) {
  const card = new Card(cardElement, cardTemplateSelector);
  placesCards.prepend(card.render());
}
//for adding a new card
popupAddCard.addEventListener("submit", (event) => {
  event.preventDefault();
  const cardElement = {
    name: popupInputCardTitle.value,
    link: popupInputCardLink.value,
  };
  createCard(cardElement);
  closePopup(popupAddCard);

  addCardForm.reset();

  addFormValidator.resetValidation();
});
//for popupEditProfile
popupEditProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = popupInputName.value;
  profileProfession.textContent = popupInputProfession.value;
  editFormValidator.resetValidation();
  closePopup(popupEditProfile);
});
//for opening popups
editButton.addEventListener("click", () => {
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
  openPopup(popupEditProfile);
});

addButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

initialCards.forEach((initialCardData) => {
  createCard(initialCardData);
});

export { pageSettings };
export const popupPic = popupImage.querySelector(".popup__image");
export const popupImageTitle = popupImage.querySelector(".popup__image-title");
