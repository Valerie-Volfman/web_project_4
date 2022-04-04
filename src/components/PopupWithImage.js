import { imagePopupElement } from "../pages/index.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPic = imagePopupElement.querySelector(".popup__image");
    this._popupImageTitle = imagePopupElement.querySelector(".popup__image-title");
  }

  open = ({ link, name }) => {
    this._popupPic = name;
    this._popupImageTitle = `url("${link}")`;

    super.open();
  };
}
