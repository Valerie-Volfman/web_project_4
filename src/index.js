import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "./Popupwithimage.js";
import Section from "./Section.js";

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
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
// const addCardForm = popupAddCard.querySelector(".popup__form");
// const editProfileForm = popupEditProfile.querySelector(".popup__form");

//DOM elements
export const cardTemplateSelector = "#card-template";
// const profileName = document.querySelector(".profile__value_type_name");
// const profileProfession = document.querySelector(
//   ".profile__value_type_profession"
// );
// const popupInputName = document.querySelector(".popup__input_type_name");
// const popupInputProfession = document.querySelector(
//   ".popup__input_type_profession"
// );
// const popupInputCardTitle = document.querySelector(
//   ".popup__input_type_card-title"
// );
// const popupInputCardLink = document.querySelector(
//   ".popup__input_type_card-link"
// );

//Buttons
// const editButton = document.querySelector(".profile__edit-button");
// const addButton = document.querySelector(".profile__add-button");

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

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item).render()

      cardList.render(card)
    },
  },
  placesCards
);
cardList.addItem();

// initialCards.forEach(cardList);

// function for creating a new card
function createCard(cardElement) {
  return new Card(cardElement, cardTemplateSelector, popupImage.open);
  // placesCards.prepend(card.render());
}

//for adding a new card
// popupAddCard.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const cardElement = {
//     name: popupInputCardTitle.value,
//     link: popupInputCardLink.value,
//   };
//   createCard(cardElement);
//   closePopup(popupAddCard);

//   addCardForm.reset();

//   addFormValidator.resetValidation();
// });
//for popupEditProfile
// popupEditProfile.addEventListener("submit", (event) => {
//   event.preventDefault();
//   profileName.textContent = popupInputName.value;
//   profileProfession.textContent = popupInputProfession.value;
//   editFormValidator.resetValidation();
//   closePopup(popupEditProfile);
// });
//for opening popups
// editButton.addEventListener("click", () => {
//   popupInputName.value = profileName.textContent;
//   popupInputProfession.value = profileProfession.textContent;
//   openPopup(popupEditProfile);
// });

// addButton.addEventListener("click", () => {
//   openPopup(popupAddCard);
// });

// initialCards.forEach(createCard);

export { pageSettings };
export const popupPic = imagePopup.querySelector(".popup__image");
export const popupImageTitle = imagePopup.querySelector(".popup__image-title");
