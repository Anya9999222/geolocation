import Widget from "./widget/Widget";

const container = document.querySelector(".container");

const widget = new Widget(container);
widget.bindToDOM();
