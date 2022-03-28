import {
  popupPic,
  popupImageTitle,
  addLike,
  deleteLike,
} from "../pages/index.js";

export default class Card {
  constructor(cardData, cardTemplateSelector, onImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._ownerId = cardData.owner._id;
    this._cardData = cardData;

    // this._addLike = addLike;
    // this._deleteLike = deleteLike;

    //
    this._template = document
      .querySelector(cardTemplateSelector)
      .content.querySelector(".card");

    this._onImageClick = onImageClick;
  }

  _checkLikesData(userData) {
    this._counter.textContent = this._likes.length;
    if (this._counter.textContent == 0) {
      this._counter.textContent = "";
    }
    if (this._likes.some((item) => item._id == userData._id)) {
      this._likeButton.classList.add("card__like_active");
      this._likeButton.classList.remove("card__like_non-active");
    }
  }

  updateLikes(res) {
    console.log(res);
    this._counter.textContent = res.likes.length;
  }

  /* _addCardLikes(cardData) {
         this._counter.textContent = cardData._likes.length;
         this._likeButton.classList.add("card__like_active");
     }

     _deleteCardLikes(cardData) {
         this._counter.textContent = cardData._likes.length;
         this._likeButton.classList.remove("card__like_active");
     }  */

  // _likesData(res) {
  //   this._counter.textContent = res._likes.length;
  //   this._likeButton.classList.toggle("card__like_non-active");
  //   // if (this._likeButton.classList.contains("card__like_active")) {
  //   //   this._counter.textContent = data._likes.length;

  //   // } else {
  //   //   this._counter.textContent = data._likes.length;
  //   // }
  //   // this._likeButton.classList.toggle("card__like_non-active");
  // }

  _addEventisteners() {
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        this._element.remove();
      });

    // this._likeButton.addEventListener("click", (evt) => {
    // })

    this._likeButton.addEventListener("click", () => {
      const isLiked = this._likeButton.classList.contains("card__like_active");
      if (isLiked) {
        deleteLike(this);
        this._likeButton.classList.remove("card__like_active");
        this._likeButton.classList.add("card__like_non-active");
      }
      if (!isLiked) {
        // const addLike = this._likeButton.classList.contains("card__like_active")
        this._likeButton.classList.add("card__like_active");
        this._likeButton.classList.remove("card__like_non-active");
        addLike(this);
      }
    });

    // this._likeButton.addEventListener("click", () => {
    //   this._likeButton.classList.toggle("card__like_non-active");
    //   const addLike = this._likeButton.classList.contains("card__like_active");
    //   this._handleLikeButton(this, addLike);
    // });

    this._element
      .querySelector(".card__picture")
      .addEventListener("click", () => {
        popupPic.style.backgroundImage = `url("${this._link}")`;
        popupImageTitle.textContent = this._name;
        this._handlePreviewPicture();
      });
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

    this._checkLikesData(userData);

    this._addEventisteners();

    return this._element;
  }
}
