import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open = ({ link, name }) => {
        this.name = name;
        this.link = `url("${link}")`;

      this._popup.classList.add("popup__is-opened");
        document.addEventListener("keydown", this._handleEscClose);
    }
}