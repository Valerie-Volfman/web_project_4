const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

//Wrappers
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const placesCards = document.querySelector(".places__cards")

//DOM elements
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

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

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
function createCardElement(cardData) { // { name, link }
  const card = cardTemplate.cloneNode(true);
  card.querySelector(".card__name").textContent = cardData.name;
  card.querySelector(".card__pic").style.backgroundImage = `url(${cardData.link})`;

  return card;
}

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

initialCards.forEach(initialCardData => {
  placesCards.prepend(createCardElement(initialCardData));
})