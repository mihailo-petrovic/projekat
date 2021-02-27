import closeSettings from "./main.js";

function changePassword() {
  let oldPass = document.getElementById("oldPass").value;
  let newPass = document.getElementById("newPass").value;
  let settingsAlertDiv = document.getElementById("settingsAlert");
  let username = JSON.parse(localStorage.getItem("loggedInTMDBUser"));
  let users = JSON.parse(localStorage.getItem("projectTMDBUsers"));
  let user = users.find((u) => u.username === username);
  let index = users.findIndex((u) => u.username === username);
  let passReg = /[a-zA-Z0-9]{7,20}\d+/;

  if (oldPass == "" || newPass == "") {
    return;
  }
  if (!passReg.test(oldPass) || !passReg.test(newPass)) {
    settingsAlertDiv.innerText =
      "Password needs to contain 8-20 characters and 1+ digits";
    return;
  }
  if (oldPass !== user.password) {
    settingsAlertDiv.innerText = "Old password incorrect!";
    return;
  }

  user.password = newPass;
  users.splice(index, 1, user);
  localStorage.setItem("projectTMDBUsers", JSON.stringify(users));

  closeSettings();
}

export default changePassword;
