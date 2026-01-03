
const heading = document.getElementById("heading");
const textInput = document.getElementById("textInput");
const addBtn = document.getElementById("addBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const list = document.getElementById("list");
const count = document.getElementById("count");


console.log(heading, textInput, addBtn, clearAllBtn, list, count);


function updateCount() {
  count.textContent = list.children.length;
  saveToLocalStorage();
}

function saveToLocalStorage() {
  const items = [];
  list.querySelectorAll("li").forEach(li => {
    items.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("items", JSON.stringify(items));
}

function createListItem(text, completed = false) {
  const li = document.createElement("li");
  li.textContent = text;

  if (completed) li.classList.add("completed");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateCount();
  });

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveToLocalStorage();
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);
}


textInput.addEventListener("input", () => {
  heading.textContent = textInput.value || "Type something...";
});


addBtn.addEventListener("click", () => {
  const value = textInput.value.trim();

  if (value === "") {
    alert("Input cannot be empty!");
    return;
  }

  createListItem(value);
  textInput.value = "";
  heading.textContent = "Type something...";
  updateCount();
});


clearAllBtn.addEventListener("click", () => {
  list.innerHTML = "";
  updateCount();
});


window.addEventListener("load", () => {
  const savedItems = JSON.parse(localStorage.getItem("items")) || [];
  savedItems.forEach(item => {
    createListItem(item.text, item.completed);
  });
  updateCount();
});
