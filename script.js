const clock = document.getElementById("clock");
const form = document.querySelector(".input-container");
const todoList = document.querySelector(".todo-container");
const inputTodo = document.getElementById("input-todo");

const todoKey = "todoList";
let todoArray = [];

function makeToDo(text) {
  const todo = document.createElement("li");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("p");
  const label = document.createElement("label");
  const btn = document.createElement("button");
  const id = todoArray.length + 1;

  todo.setAttribute("class", "todo");
  todo.setAttribute("id", id);
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "checkbox");
  checkbox.setAttribute("id", `checkbox${id}`);
  todoText.setAttribute("class", "todo-text");
  label.setAttribute("for", "checkbox");
  label.setAttribute("class", "a11y-hidden");
  btn.setAttribute("class", "delete-btn");
  btn.setAttribute("type", "button");
  btn.addEventListener("click", deleteTodo);

  todoText.textContent = text;
  btn.textContent = "Delete";

  todo.appendChild(checkbox);
  todo.appendChild(todoText);
  todo.appendChild(label);
  todo.appendChild(btn);
  todoList.appendChild(todo);

  const todoObj = {
    id: id,
    text: text,
  };

  todoArray.push(todoObj);
  saveToDo();
}

function saveToDo() {
  localStorage.setItem(todoKey, JSON.stringify(todoArray));
}

function loadToDo() {
  const loadedToDo = localStorage.getItem("todoList");
  if (loadedToDo !== null) {
    const parsedToDo = JSON.parse(loadedToDo);
    parsedToDo.forEach(function (todo) {
      makeToDo(todo.text);
    });
  }
}

function getTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const day2 = ["SUN", "MON", "TUE", "WEN", "THR", "FRI", "SAT"][date.getDay()];
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerHTML = `${year}. ${month}. ${day}. ${day2}<br>
  ${hours}:${minutes}:${seconds}`;
}

function enterKey() {
  if (window.event.keyCode == 13) {
    handleSubmit();
  }
}

function deleteTodo(e) {
  const btn = e.target;
  const todo = btn.parentNode;
  console.log(todo);
  console.log(todo.id);
  todoList.removeChild(todo);
  const cleanTodo = todoArray.filter(function (todoIndex) {
    return todoIndex.id !== parseInt(todo.id);
  });
  todoArray = cleanTodo;
  saveToDo();
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = inputTodo.value;
  inputTodo.value = "";
  if (currentValue === "") {
    alert("할 일을 입력해주세요.");
    return;
  } else {
    makeToDo(currentValue);
  }
}

function init() {
  getTime();
  loadToDo();
  form.addEventListener("submit", handleSubmit);
  setInterval(getTime, 1000);
}

init();