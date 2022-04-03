import { popupPic, popupImageTitle } from "../pages/index.js";

export default class Card {
  constructor(
    cardData,
    cardTemplateSelector,
    onImageClick,
    handleRemoveCardClick,
    onLikeButtonClick
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._ownerId = cardData.owner._id;
    this._cardData = cardData;

    this._template = document
      .querySelector(cardTemplateSelector)
      .content.querySelector(".card");

    this._onImageClick = onImageClick;
    this._handleRemoveCardClick = handleRemoveCardClick;
    this._onLikeButtonClick = onLikeButtonClick;
  }

  _setDeleteButtonDisplay(userData) {
    if (this._ownerId !== userData._id) {
      this._deleteButton.style.display = "none";
    }
  }

  updateLikes(res) {
    this._renderLikes();
    this._counter.textContent = res.likes.length || "";
  }

  _isLiked(data) {
    console.log(this._likes);
    console.log(data._id);
    if (this._likes.some((item) => item._id == data._id)) {
      this._likeButton.classList.add("card__like_active");
    }
  }

  _getLikesCount() {
    this._counter.textContent = this._likes.length || "";
  }

  _renderLikes() {
    this._likeButton.classList.toggle("card__like_active");
  }

  _addEventisteners() {
    this._deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      this._handleRemoveCardClick(this);
    });

    this._likeButton.addEventListener("click", () => {
      const isLiked = this._likeButton.classList.contains("card__like_active");
      this._onLikeButtonClick(this, isLiked);
    });

    this._element
      .querySelector(".card__picture")
      .addEventListener("click", () => {
        popupPic.style.backgroundImage = `url("${this._link}")`;
        popupImageTitle.textContent = this._name;
        this._handlePreviewPicture();
      });
  }

  deleteCard() {
    this._element = null;
  }

  _handlePreviewPicture() {
    this._onImageClick({ link: this.link, name: this.name });
  }

  render(userData) {
    this._element = this._template.cloneNode(true);
    this._element.querySelector(".card__name").textContent = this._name;
    this._element.querySelector(
      ".card__picture"
    ).style.backgroundImage = `url("${this._link}")`;
    this._likeButton = this._element.querySelector(".card__like");
    this._counter = this._element.querySelector(".card__like-counter");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._setDeleteButtonDisplay(userData);
    this._isLiked(userData);
    this._getLikesCount();
    this._addEventisteners();
    return this._element;
  }
}
