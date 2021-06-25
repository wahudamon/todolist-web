document.addEventListener("DOMContentLoaded", function() {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function(event) {
    event.preventDefault();
    addTodo();
  });

  if(isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromTodos();
});