const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka
    _items.addEventListener("click", function(e) {
      finish(e);
      deleteItem(e);
      edit(e);
    });
    _items.addEventListener("keydown", (e)=>{
      commit(e);
    });
  }

  function formHandler(e) {
    e.preventDefault();
    const input = document.querySelector(".form__input").value;
    if(input.trim() != "") {
      add(input);
    }
    document.querySelector(".form__input").value="";
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    if (e.target.classList.contains("item__checkbox")) {
      e.target.parentNode.classList.toggle("item--done");
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    if (e.target.classList.contains("item__text")) {
      const text = e.target.innerHTML;
      const input = el("input", "item__edit", null, "text");
      input.value = text; 
      e.target.parentNode.replaceChild(input, e.target);
      input.focus();
    }
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const element = document.activeElement;
    if (element.classList.contains("item__edit") && e.keyCode === ENTER_KEYCODE) {
      const text = element.value;
      const span = el("span", "item__text", null);
      span.innerHTML = text;
      element.parentNode.replaceChild(span, element);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const newLi = el("li", "item", null);
    const newCheck = el("input", "item__checkbox", null, "checkbox");
    const newText = el("span", "item__text", null);
    const newButton = el("button", "item__button", null);
    newButton.innerHTML = "Eyða";
    newText.innerHTML = value;
    newLi.appendChild(newCheck);
    newLi.appendChild(newText);
    newLi.appendChild(newButton);
    items.appendChild(newLi);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    if (e.target.classList.contains("item__button")) {
      e.target.parentNode.remove();
    }
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler, input = null) {
    let element = document.createElement(type);
    element.classList.add(className);
    if (input != null) {
      element.setAttribute("type", input);
    }
    return element;
  }

  return {
    init: init
  }
})();
