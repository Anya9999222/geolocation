import Note from "../note/Note";
import { validateCoords } from "../validateCoords";
import "./modal.css";

export default class Modal {
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
