import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import logo from "../images/Logo.svg";
import PopupWithImage from "../components/Popupwithimage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { pageSettings } from "../utils/constants.js";
import Api from "../utils/Api"
import { data } from "autoprefixer";

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
export const imagePopupElement = document.querySelector(
  ".popup_type_image-popup"
);
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

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "2911a1a5-67c1-4d46-aa09-949272fd93e2",
    "Content-Type": "application/json"
  }
});

/**This is a description of the new Section function. */
export const cardList = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = createCard(item).render();

      cardList.addItem(card);
    },
  },
  placesList
);
// cardList.render();

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
async function handleAddCardFormSubmit () {
  const newCard = {
    link: addCardPopup._getInputValues().popupInputCardLink,
    name: addCardPopup._getInputValues().popupInputCardTitle,
  };
  await api.addCard(newCard.name, newCard.link)
  const card = createCard(newCard).render();
  if (card) {
  cardList.addItem(card);
  }
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
  userInfo.setUserInfo(editProfilePopup._getInputValues());
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



api
.getInitialCards()
.then((cards) => {
  cardList.render(Array.from(cards));
});

api
.getUserData(editProfilePopup._getInputValues())
.then((userData) => {
  userInfo.setUserInfo({ popupInputName: userData.name, popupInputProfession: userData.about });
  
})



export const popupPic = imagePopupElement.querySelector(".popup__image");
export const popupImageTitle = imagePopupElement.querySelector(
  ".popup__image-title"
);