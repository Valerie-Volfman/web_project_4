//DOM elements
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");

const profileName = document.querySelector(".profile__value_type_name");
const profileProfession = document.querySelector(
  ".profile__value_type_profession"
);
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button")

const popup = document.querySelector(".popup");
const popupEditProfileCloseButton = popupEditProfile.querySelector(".popup__close-button");
const popupAddCardCloseButton = popupAddCard.querySelector(".popup__close-button");
const popupSaveButton = document.querySelector(".popup__save-button");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputProfession = document.querySelector(
  ".popup__input_type_profession"
);

const popupInputCardTitle = document.querySelector(".popup__input_type_card-title");
const popupInputCardLink = document.querySelector(".popup__input_type_card-link");
const cardName = document.querySelector(".card__name");
const cardLink = document.querySelector(".card__pic");

/*const cardLike = document.querySelector(".card__like");*/

//Functions
editButton.addEventListener("click", () => {
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
  let editButton = openPopup(popupEditProfile);
});

addButton.addEventListener("click", () => {
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
  let addButton = openPopup(popupAddCard);
});

popup.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = popupInputName.value;
  profileProfession.textContent = popupInputProfession.value;
  let popupSaveButton = closePopup();
});

popupEditProfileCloseButton.addEventListener("click", function() { closePopup(popupEditProfile) });
popupAddCardCloseButton.addEventListener("click", function() { closePopup(popupAddCard) });

function openPopup(popup) {
  popup.classList.add("popup__is-opened");
}

function closePopup(popup) {
  popup.classList.remove("popup__is-opened");
}
