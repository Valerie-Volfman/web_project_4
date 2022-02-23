import { cardTemplateSelector, popupImage, placesCards } from "./index.js";
import Card from "./Card.js";

export default class Section {
    constructor({items, renderer}, placesCards) {
        this._renderedItems = items;
        this._renderer = renderer;

        this._placesCards = placesCards;
    }

    render(item) {
        this._placesCards.prepend(item);
    }

    addItem() {
        this._renderedItems.forEach(item => {
            this._renderer(item)
        });
    }
}