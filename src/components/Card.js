export default class Card {
  constructor(
    cardData,
    cardTemplateSelector,
    onImageClick,
    handleRemoveCardClick,
    onLikeButtonClick,
    imagePopupElement
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._ownerId = cardData.owner._id;
    this._cardData = cardData;

    this._popupPic = imagePopupElement.querySelector(".popup__image");
    this._popupImageTitle = imagePopupElement.querySelector(
      ".popup__image-title"
    );

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
    this._likes = res.likes;
    this._renderLikes();
  }

  _setLikesCount() {
    this._counter.textContent = this._likes.length || "";
  }

  _isLiked = () => this._likes.some((item) => item._id == this._userId);

  _renderLikes() {
    this._setLikesCount();
    if (this._isLiked()) {
      this._likeButton.classList.add("card__like_active");
    } else {
      this._likeButton.classList.remove("card__like_active");
    }
  }

  _addEventisteners() {
    this._deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      this._handleRemoveCardClick(this);
    });

    this._likeButton.addEventListener("click", () => {
      this._onLikeButtonClick(this, this._isLiked());
    });

    this._element
      .querySelector(".card__picture")
      .addEventListener("click", () => {
        this._popupPic.style.backgroundImage = `url("${this._link}")`;
        this._popupImageTitle.textContent = this._name;
        this._handlePreviewPicture();
      });
  }

  deleteCard() {
    this._element.remove();
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
    this._addEventisteners();
    this._setDeleteButtonDisplay(userData);
    this._userId = userData._id;
    this._renderLikes(userData._id);
    return this._element;
  }
}
