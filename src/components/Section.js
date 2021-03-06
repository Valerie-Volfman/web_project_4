export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;

    this._container = container;
  }

  addItem(item) {
    this._container.prepend(item);
  }

  render(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }
}
