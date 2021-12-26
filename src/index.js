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
const popupImage = document.querySelector(".popup_type_image-popup");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const placesCards = document.querySelector(".places__cards");

//DOM elements
const profileName = document.querySelector(".profile__value_type_name");
const profileProfession = document.querySelector(
  ".profile__value_type_profession"
);
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popup = document.querySelector(".popup");
const popupEditProfileCloseButton = popupEditProfile.querySelector(
  ".popup__close-button"
);
const popupAddCardCloseButton = popupAddCard.querySelector(
  ".popup__close-button"
);
const popupImageCloseButton = popupImage.querySelector(
  ".popup__image-close-button"
);
const popupSaveButton = document.querySelector(".popup__save-button");
const popupAddCardButton = document.querySelector(".popup__save-button");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const popupForm = popupAddCard.querySelector(".popup__form");

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

const popupPic = popupImage.querySelector(".popup__image");
const popupImageTitle = popupImage.querySelector(".popup__image-title");

//Functions
function createCardElement(cardData) {
  // { name, link } //function for creating a new card
  const card = cardTemplate.cloneNode(true);
  card.querySelector(".card__name").textContent = cardData.name;
  card.querySelector(
    ".card__picture"
  ).style.backgroundImage = `url("${cardData.link}")`;

  card
    .querySelector(".card__delete-button")
    .addEventListener("click", (event) => {
      event.stopPropagation();
      card.remove();
    });

  card.querySelector(".card__like").addEventListener("click", () => {
    card.querySelector(".card__like").classList.toggle("card__like_non-active");
  });

  card.querySelector(".card__picture").addEventListener("click", () => {
    popupPic.style.backgroundImage = `url("${cardData.link}")`;
    popupImageTitle.textContent = cardData.name;
    openPopup(popupImage);
  });

  return card;
}

editButton.addEventListener("click", () => {
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
  checkInitialFormValidity(popupEditProfile.querySelector(".popup__form"), pageSettings);
  openPopup(popupEditProfile);
});

addButton.addEventListener("click", () => {

  checkInitialFormValidity(popupEditProfile.querySelector(".popup__form"), pageSettings);
  openPopup(popupAddCard);
  popupForm.reset();
});

popup.addEventListener("submit", (event) => {
  //function for popup
  event.preventDefault();
  profileName.textContent = popupInputName.value;
  profileProfession.textContent = popupInputProfession.value;
  closePopup(popup);
});

popupAddCard.addEventListener("submit", (event) => {
  //function for adding a new card
  event.preventDefault();
  const cardElement = createCardElement({ name: popupInputCardTitle.value, link: popupInputCardLink.value });
  placesCards.prepend(cardElement);
  closePopup(popupAddCard);
});

popupEditProfileCloseButton.addEventListener("click", function () {
  closePopup(popupEditProfile);
});
popupAddCardCloseButton.addEventListener("click", function () {
  closePopup(popupAddCard);
});

popupImageCloseButton.addEventListener("click", function () {
  closePopup(popupImage);
});

function openPopup(popup) {
  popup.classList.add("popup__is-opened");
}

function closePopup(popup) {
  popup.classList.remove("popup__is-opened");
}

initialCards.forEach((initialCardData) => {
  placesCards.prepend(createCardElement(initialCardData));
});
