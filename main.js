/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/js/note/Note.js

class Note {
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
      minute: "numeric"
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
;// CONCATENATED MODULE: ./src/js/validateCoords.js
function validateCoords(coords) {
  const regExp = /^(\[?-?\d+\.\d{3,7},\s?-?\d+\.\d{3,7}\]?)$/;
  const result = regExp.test(coords);
  if (result) {
    const arr = coords.split(",");
    return {
      lat: arr[0].replace("[", ""),
      long: arr[1].trim().replace("]", "")
    };
  } else {
    return false;
  }
}
;// CONCATENATED MODULE: ./src/js/modal/modal.js



class Modal {
  constructor(parentEl, note) {
    this.parentEl = parentEl;
    this.note = note;
    this.onSubmit = this.onSubmit.bind(this);
  }
  static get markup() {
    return `
            <div class="modal-container">
                <form class="modal-form">
                    <label class="modal-label">
                    Что-то пошло не так <br>
                    К сожалению, нам не удалось определить ваше местоположение, 
                    пожалуйста, дайте разрешение на использование геолокации, 
                    либо введите координаты вручную <br>
                    Широта и долгота через запятую <br>
                    </label>
                    <input class="modal-input" title="Введите данные в формате [0.12345, -1.56558]"required>
                    <button type="reset" class="return">Отмена</button>
                    <button class="submit">Ок</button
                </form>
            </div>
        `;
  }
  bindToDOM() {
    this.parentEl.insertAdjacentHTML("afterbegin", Modal.markup);
    const form = document.querySelector(".modal-form");
    // const returnBtn = document.querySelector('.return');
    // returnBtn.addEventListener('click', this.clearForm)
    form.addEventListener("submit", this.onSubmit);
  }
  onSubmit(e) {
    e.preventDefault();
    const input = document.querySelector(".modal-input");
    const correctFormat = validateCoords(input.value);
    const noteContainer = document.querySelector(".widget-content");
    if (correctFormat) {
      const note = new Note(this.note, correctFormat, noteContainer);
      note.bindToDom();
      e.target.closest(".modal-container").remove();
    } else {
      input.classList.add("incorrect");
    }
  }
}
;// CONCATENATED MODULE: ./src/js/widget/Widget.js



class Widget {
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
      navigator.geolocation.getCurrentPosition(function (data) {
        const {
          latitude,
          longitude
        } = data.coords;
        const coordinates = {
          lat: latitude,
          long: longitude
        };
        const note = new Note(text, coordinates, container);
        note.bindToDom();
        console.log("lat " + latitude);
        console.log("long " + longitude);
      }, function (err) {
        const modal = new Modal(parent, text);
        modal.bindToDOM();
        console.log(err);
      }, {
        enableHighAccuracy: true
      });
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const container = document.querySelector(".container");
const widget = new Widget(container);
widget.bindToDOM();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;