import  Card  from "./Card.js";
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
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_add-card");
const addCardForm = popupAddCard.querySelector(".popup__form");
const editProfileForm = popupEditProfile.querySelector(".popup__form");
const profileName = document.querySelector(".profile__value_type_name");
const profileProfession = document.querySelector(
  ".profile__value_type_profession"
);

const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputProfession = document.querySelector(
  ".popup__input_type_profession"
);

//DOM elements
const cardTemplateSelector = "#card-template";
 const popupInputCardTitle = document.querySelector(
   ".popup__input_type_card-title"
 );
 const popupInputCardLink = document.querySelector(
   ".popup__input_type_card-link"
 );

export const popupPic = popupImage.querySelector(".popup__image");
export const popupImageTitle = popupImage.querySelector(".popup__image-title");

popupAddCard.addEventListener("submit", (event) => {
  //function for adding a new card
  event.preventDefault();
  const cardElement = ({
    name: popupInputCardTitle.value,
    link: popupInputCardLink.value,
  });
  const card = new Card(cardElement, cardTemplateSelector)
  placesCards.prepend(card.render());
  closePopup(popupAddCard);
  addCardForm.reset();
});

popupEditProfile.addEventListener("submit", (event) => {
  //function for popupEditProfile
  event.preventDefault();
  profileName.textContent = popupInputName.value;
  profileProfession.textContent = popupInputProfession.value;
  closePopup(popupEditProfile);
});

editButton.addEventListener("click", () => {
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
  checkInitialFormValidity(editProfileForm, pageSettings);
  openPopup(popupEditProfile);
});

addButton.addEventListener("click", () => {
  checkInitialFormValidity(addCardForm, pageSettings);
  openPopup(popupAddCard);
});

initialCards.forEach((initialCardData) => {
  const card = new Card(initialCardData, cardTemplateSelector)
  placesCards.prepend(card.render());
});

const formSelector = ".popup__form";
const pageSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function enableValidation(settings) {
  const forms = document.querySelectorAll(formSelector);
  forms.forEach((formElement) => {
    const formValidator = new FormValidator(settings, formElement);

    formValidator.enableValidation();
  });
}

 export function checkInitialFormValidity(formElement, settings) {
   const inputElements = [
     ...formElement.querySelectorAll(pageSettings.inputSelector),
   ];
  const buttonElement = formElement.querySelector(
     pageSettings.submitButtonSelector
   );
   const formValidator = new FormValidator(pageSettings, formElement);

   formValidator.toggleButtonState(inputElements, buttonElement, settings);
 }

 enableValidation(pageSettings);

 export { pageSettings }
