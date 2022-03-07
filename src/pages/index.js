import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import logo from "../images/Logo.svg";
import PopupWithImage from "../components/Popupwithimage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, pageSettings } from "../utils/constants.js"


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

/**Popups */
export const popupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
);
export const popupAddCard = document.querySelector(".popup_type_add-card");
export const imagePopupElement = document.querySelector(".popup_type_image-popup");
export const imagePopup = new PopupWithImage(".popup_type_image-popup");
imagePopup.setEventListeners();

/**Buttons */
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

/**Validators */
export const editFormValidator = new FormValidator(
  pageSettings,
  popupEditProfile
);
export const addFormValidator = new FormValidator(pageSettings, popupAddCard);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/**This is a description of the new Section function. */
export const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item).render();

      cardList.addItem(card);
    },
  },
  placesList
);
cardList.render();

/**This is a description of the createCard function. */
export function createCard(cardElement) {
  return new Card(cardElement, cardTemplateSelector, imagePopup.open);
}

/**Represents AddCardPopup */
export const addCardPopup = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();
/**This is a description of the handleAddCardFormSubmit function. */
function handleAddCardFormSubmit() {
  const newCard = {
    link: addCardPopup._formValues.popupInputCardLink,
    name: addCardPopup._formValues.popupInputCardTitle,
  };
  const card = createCard(newCard).render();
  cardList.addItem(card);
  addCardPopup.close();
}
/**Represents EditProfilePopup */
export const userInfo = new UserInfo({ profileName, profileProfession });

export const editProfilePopup = new PopupWithForm(
  ".popup_type_edit-profile",
  handleProfileFormSubmit
);
editProfilePopup.setEventListeners();

/**This is a description of the handleProfileFormSubmit function. */
function handleProfileFormSubmit() {
  userInfo.setUserInfo(editProfilePopup._formValues);
  editProfilePopup.close();
}

/**This is a description of the opening popups functions. */
editButton.addEventListener("click", () => {
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
});

export const popupPic = imagePopupElement.querySelector(".popup__image");
export const popupImageTitle = imagePopupElement.querySelector(".popup__image-title");
