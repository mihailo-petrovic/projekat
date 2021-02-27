import closeSettings from "./main.js";

function changeUsername() {
  let title = document.getElementById("titleUser");
  let newNameInput = document.getElementById("changeUsername");
  let settingsAlertDiv = document.getElementById("settingsAlert");
  let newName = newNameInput.value;
  let oldName = JSON.parse(localStorage.getItem("loggedInTMDBUser"));
  let users = JSON.parse(localStorage.getItem("projectTMDBUsers"));
  let user = users.find((u) => u.username === oldName);
  let index = users.findIndex((u) => u.username === oldName);
  let userReg = /[a-zA-Z]{5,20}/;

  settingsAlertDiv.innerText = "";

  if (newName == "") {
    return;
  }
  if (newName == oldName) {
    closeSettings();
    return;
  }
  if (!userReg.test(newName)) {
    settingsAlertDiv.innerText = "Username has to be 5-20 letters!";
    return;
  }
  if (users.find((u) => u.username === newName)) {
    settingsAlertDiv.innerText = "Username already exists!";
    return;
  }

  user.username = newName;
  users.splice(index, 1, user);
  localStorage.setItem("projectTMDBUsers", JSON.stringify(users));
  localStorage.setItem("loggedInTMDBUser", JSON.stringify(newName));
  title.innerText = "Welcome, " + newName;

  closeSettings();
}

export default changeUsername;
