// import { openPopup } from "./utils.js";
import { popupPic, popupImageTitle, popupImage } from "./index.js";

export default class Card {
  constructor(cardData, cardTemplateSelector, onImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._template = document
      .querySelector(cardTemplateSelector)
      .content.querySelector(".card");
      
    this._onImageClick = onImageClick;
  }

  _addEventisteners() {
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        this._element.remove();
      });

    this._element
      .querySelector(".card__like")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("card__like_non-active");
      });

    this._element
      .querySelector(".card__picture")
      .addEventListener("click", () => {
        popupPic.style.backgroundImage = `url("${this._link}")`;
        popupImageTitle.textContent = this._name;
        this._handlePreviewPicture();
      });
  }

  _handlePreviewPicture() {
    this._onImageClick({ link: this.link, name: this.name })
  }

  render() {
    this._element = this._template.cloneNode(true);
    this._element.querySelector(".card__name").textContent = this._name;
    this._element.querySelector(
      ".card__picture"
    ).style.backgroundImage = `url("${this._link}")`;

    this._addEventisteners();

    return this._element;
  }
}
