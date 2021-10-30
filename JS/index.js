const profileName = document.querySelector(".profile__value_type_name");
const profileProfession = document.querySelector(".profile__value_type_profession");
const editButton = document.querySelector(".profile__edit-button");

const popup = document.querySelector("popup");
const popupCloseButton = document.querySelector(".popup__close-button");
const popupSaveButton = document.querySelector(".popup__save-button");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputProfession = document.querySelector(".popup__input_type_profession");

editButton.addEventListener("click", () => {
    popupInputName.value = profileName.textContent;
    popupInputProfession.value = profileProfession.textContent;
    openPopup();
});

popupSaveButton.addEventListener("click", (event) => {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
    closePopup();
});

popupCloseButton.addEventListener("click", closePopup);

function openPopup() {
    popup.classList.add("popup__is-opened")
}

function closePopup() {
    popup.classList.remove("popup__is-opened")
}