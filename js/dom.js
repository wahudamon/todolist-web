const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";
const TODO_ITEMID = "itemId";

function addTodo() {
  const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
  const textTodo = document.getElementById("title").value;
  const timestamp = document.getElementById("date").value;

  for(let i = 0; i < 1; i++) {
    const todo = makeTodo(textTodo, timestamp);
    const todoObject = composeTodoObject(textTodo, timestamp, false);

    todo[TODO_ITEMID] = todoObject.id;
    todos.push(todoObject);

    uncompletedTODOList.append(todo);
    updateDataToStorage();
  }
}

function makeTodo(data, timestamp, isCompleted) {
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
  if(isCompleted){
    container.append(
      createUndoButton(),
      createTrashButton()
    );
  } else {
    container.append(createCheckButton());
  }

  return container;
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function(event) {
    eventListener(event);
  });

  return button;
}

function createCheckButton() {
  return createButton("check-button", function(event) {
    addTaskToCompleted(event.target.parentElement);
  });
}

function createTrashButton() {
  return createButton("trash-button", function(event) {
    removeTaskFromCompleted(event.target.parentElement);
  });
}

function createUndoButton() {
  return createButton("undo-button", function(event){
    undoTaskFromCompleted(event.target.parentElement);
  });
}

function addTaskToCompleted(taskElement) {
  const taskTitle = taskElement.querySelector(".inner > h2").innerText;
  const taskTimestamp = taskElement.querySelector(".inner > p").innerText;
  const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
  
  const newTodo = makeTodo(taskTitle, taskTimestamp, true);
  const todo = findTodo(taskElement[TODO_ITEMID]);
  todo.isCompleted = true;
  newTodo[TODO_ITEMID] = todo.id;

  listCompleted.append(newTodo);
  taskElement.remove();

  updateDataToStorage();
}

function undoTaskFromCompleted(taskElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
  const taskTitle = taskElement.querySelector(".inner > h2").innerText;
  const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

  const newTodo = makeTodo(taskTitle, taskTimestamp, false);

  listUncompleted.append(newTodo);
  taskElement.remove();
}

function removeTaskFromCompleted(taskElement) {
  const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
  todos.splice(todoPosition, 1);

  taskElement.remove();
  updateDataToStorage();
}