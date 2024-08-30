import Modal from "../modal/modal";
import Note from "../note/Note";
import "./widget.css";

export default class Widget {
  constructor(container) {
    this.container = container;
    this.onTextEnter = this.onTextEnter.bind(this);
  }

  static get markup() {
    return `
            <div class="widget-container">
                <div class="widget-content"></div>
                <div class="widget-footer">
                    <input class="widget-input"></input>
                </div>
            </div>
        `;
  }

  static get input() {
    return ".widget-input";
  }

  static get content() {
    return ".widget-content";
  }

  bindToDOM() {
    this.container.innerHTML = Widget.markup;

    this.input = this.container.querySelector(Widget.input);
    this.input.addEventListener("keyup", this.onTextEnter);
  }

  onTextEnter(e) {
    if (e.key !== "Enter") {
      return;
    }

    this.noteContainer = this.container.querySelector(Widget.content);
    this.makeNote(this.input.value, this.noteContainer, this.container);
    this.input.value = "";
  }

  makeNote(text, container, parent) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (data) {
          const { latitude, longitude } = data.coords;
          const coordinates = {
            lat: latitude,
            long: longitude,
          };
          const note = new Note(text, coordinates, container);
          note.bindToDom();
          console.log("lat " + latitude);
          console.log("long " + longitude);
        },
        function (err) {
          const modal = new Modal(parent, text);
          modal.bindToDOM();
          console.log(err);
        },
        { enableHighAccuracy: true },
      );
    }
  }
}
