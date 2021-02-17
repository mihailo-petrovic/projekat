const regLink = document.getElementById("regLink");
const regForm = document.getElementById("regForm");
const logForm = document.getElementById("logForm");
const login = document.getElementById("login");
const registration = document.getElementById("registration");

regLink.addEventListener("click", () => {
  logForm.classList.add("disNone");
  regForm.classList.remove("disNone");
});

registration.onsubmit = (e) => {
  e.preventDefault();
};

login.onsubmit = (e) => {
  e.preventDefault();
//   window.location = "main.html";
};

let user = {};
let users = [];
let loggedUser = {};
