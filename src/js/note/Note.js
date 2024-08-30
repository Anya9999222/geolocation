import "./note.css";
export default class Note {
  constructor(content, coords, container) {
    this.content = content;
    this.coords = coords;
    this.container = container;
    this.hideCoords = this.hideCoords.bind(this);
  }

  static get markup() {
    return `
                <div class="note-main">
                    <div class="note-content"></div>
                    <div class="note-date"></div>
                </div>
                <div class="note-footer">
                    <div class="coordinates"></div>
                    <div class="hide-coords"></div>
                </div>
        `;
  }

  static get content() {
    return ".note-content";
  }

  static get coordinates() {
    return ".coordinates";
  }

  bindToDom() {
    this.element = document.createElement("div");
    this.element.classList.add("note-container");

    this.container.appendChild(this.element);
    this.element.insertAdjacentHTML("beforeend", Note.markup);

    const content = this.element.querySelector(Note.content);
    const coordinates = this.element.querySelector(Note.coordinates);
    content.textContent = this.content;
    coordinates.textContent = `[${this.coords.lat}, ${this.coords.long}]`;

    const date = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
    };
    const noteDate = this.element.querySelector(".note-date");
    noteDate.textContent = date.toLocaleDateString("ru-RU", options);

    this.hideBtn = this.element.querySelector(".hide-coords");
    this.hideBtn.addEventListener("click", this.hideCoords);
  }

  hideCoords() {
    this.hideBtn.classList.toggle("hidden");
    const coordsBlock = this.element.querySelector(".coordinates");
    coordsBlock.classList.toggle("coords-hidden");
  }
}
