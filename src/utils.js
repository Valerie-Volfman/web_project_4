const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__is-opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

function escapeHandler(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup__is-opened");
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup__is-opened");
  document.addEventListener("keydown", escapeHandler);
}

export function closePopup(popup) {
  popup.classList.remove("popup__is-opened");
  document.removeEventListener("keydown", escapeHandler);
}
