// Variables
const regLink = document.getElementById("regLink");
const regForm = document.getElementById("regForm");
const logForm = document.getElementById("logForm");
const login = document.getElementById("login");
const registration = document.getElementById("registration");
const regUserInput = document.getElementById("regUsername");
const regPass1Input = document.getElementById("regPassword1");
const regPass2Input = document.getElementById("regPassword2");
const regMessage = document.getElementById("regMessage");
const logMessage = document.getElementById("logMessage");
const logUserInput = document.getElementById("username");
const logUserPass = document.getElementById("password");

let users, user;

// Listeners
regLink.addEventListener("click", () => {
  logForm.classList.add("disNone");
  regForm.classList.remove("disNone");
});

registration.onsubmit = (e) => {
  e.preventDefault();
  registerUser();
};

login.onsubmit = (e) => {
  e.preventDefault();
  loginUser();
};

// Functions
function registerUser() {
  let username = regUserInput.value;
  let pass1 = regPass1Input.value;
  let pass2 = regPass2Input.value;

  let userReg = /[a-zA-Z]{5,20}/;
  let passReg = /(?=.*[0-9]){8,30}/;

  // Testing user entries
  if (!userReg.test(username)) {
    regMessage.innerText = "Username needs to be at least 5 characters";
    regMessage.classList.remove("disNone");
    regUserInput.style.border = "1.5px solid rgb(161, 17, 17)";
    return;
  }
  if (!passReg.test(pass1)) {
    regMessage.innerText =
      "Password needs to contain 8 characters and one digit";
    regMessage.classList.remove("disNone");
    regPass1Input.style.border = "1.5px solid rgb(161, 17, 17)";
    regPass2Input.style.border = "1.5px solid rgb(161, 17, 17)";
    return;
  }
  if (pass1 !== pass2) {
    regMessage.innerText = "Passwords don't match each other";
    regMessage.classList.remove("disNone");
    regPass1Input.style.border = "1.5px solid rgb(161, 17, 17)";
    regPass2Input.style.border = "1.5px solid rgb(161, 17, 17)";
    return;
  }
  if (localStorage.getItem("projectTMDBUsers")) {
    users = JSON.parse(localStorage.getItem("projectTMDBUsers"));
    let exists = users.find((user) => user.username === username);
    if (exists == undefined) {
      pushUser(username, pass2);
      clearForms();
    } else {
      regMessage.innerText = "Username already exists";
      regMessage.classList.remove("disNone");
    }
  } else {
    users = [];
    pushUser(username, pass2);
    clearForms();
  }
}

function pushUser(username, password) {
  user = {
    username: username,
    password: password,
    likedMovies: [],
    watchLater: [],
    ratedMovies: [],
  };
  users.push(user);
  let usersJson = JSON.stringify(users);
  localStorage.setItem("projectTMDBUsers", usersJson);

  logForm.classList.remove("disNone");
  regForm.classList.add("disNone");
}

function loginUser() {
  let username = logUserInput.value;
  let password = logUserPass.value;
  let users = JSON.parse(localStorage.getItem("projectTMDBUsers"));

  let obj = users.find((user) => username === user.username);
  if (obj == undefined) {
    logMessage.innerText = "No such user";
    logMessage.classList.remove("disNone");
    return;
  }
  if (password != obj.password) {
    logMessage.innerText = "Incorrect password!";
    logMessage.classList.remove("disNone");
    return;
  }

  if (password === obj.password) {
    clearForms();
    localStorage.setItem("loggedInTMDBUser", JSON.stringify(obj));
    window.location = "../main.html";
  }
}

function clearForms(){
  logMessage.classList.add("disNone");
  regMessage.classList.add("disNone");
  regUserInput.value = '';
  regPass1Input.value = '';
  regPass2Input.value = '';
  logUserInput.value = '';
  logUserPass.value = '';
  regUserInput.style.border = 'none';
  regPass1Input.style.border = 'none';
  regPass2Input.style.border = 'none';
}