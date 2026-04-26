
import { remindersRef } from "./firebase.js";
import {
  push,
  onValue,
  remove,
  update,
  child
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const titleInput = document.getElementById("titleInput");
const categoryInput = document.getElementById("categoryInput");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const notesInput = document.getElementById("notesInput");
const addBtn = document.getElementById("addBtn");
const reminderList = document.getElementById("reminderList");

addBtn.addEventListener("click", async () => {
  const title = titleInput.value.trim();

  if (!title) {
    alert("Please enter reminder title");
    return;
  }

  const reminder = {
    title,
    category: categoryInput.value,
    dueDate: dateInput.value,
    dueTime: timeInput.value,
    notes: notesInput.value.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  await push(remindersRef, reminder);

  titleInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
  notesInput.value = "";
});

onValue(remindersRef, (snapshot) => {
  reminderList.innerHTML = "";

  const data = snapshot.val();

  if (!data) {
    reminderList.innerHTML = `<p class="text-gray-500">No reminders yet.</p>`;
    return;
  }

  Object.entries(data).forEach(([id, reminder]) => {
    const card = document.createElement("div");

    card.className = `
      border rounded-lg p-3 flex justify-between items-start
      ${reminder.completed ? "bg-gray-100 opacity-60 line-through" : "bg-white"}
    `;

    card.innerHTML = `
      <div>
        <h3 class="font-bold text-lg">${reminder.title}</h3>
        <p class="text-sm text-gray-600">${reminder.category}</p>
        <p class="text-sm text-gray-600">
          ${reminder.dueDate || "No date"} ${reminder.dueTime || ""}
        </p>
        <p class="text-sm text-gray-500">${reminder.notes || ""}</p>
      </div>

      <div class="flex gap-2">
        <button data-id="${id}" class="completeBtn bg-green-500 text-white px-2 py-1 rounded">
          Done
        </button>
        <button data-id="${id}" class="deleteBtn bg-red-500 text-white px-2 py-1 rounded">
          Delete
        </button>
      </div>
    `;

    reminderList.appendChild(card);
  });

  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      await remove(childRef(id));
    });
  });

  document.querySelectorAll(".completeBtn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      await update(childRef(id), {
        completed: true
      });
    });
  });
});

function childRef(id) {
  return new URLRef(remindersRef, id);
}
