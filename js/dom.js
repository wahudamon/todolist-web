const UNCOMPLETED_LIST_TODO_ID = "todos";

function addTodo() {
  const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
  const textTodo = document.getElementById("title").value;
  const timestamp = document.getElementById("date").value;

  for(let i = 0; i < 10; i++) {
    const todo = makeTodo(textTodo, timestamp);
    uncompletedTODOList.append(todo);
  }
}

function makeTodo(data, timestamp) {
  const textTitle = document.createElement("h2");
  textTitle.innerText = data;
  const textTimestamp = document.createElement("p");
  textTimestamp.innerText = timestamp;
  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textTimestamp);
  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);

  return container;
}