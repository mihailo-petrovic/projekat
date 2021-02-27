import searchMovies from "./searchMovies.js";
import renderLists from "./renderLists.js";
import changeUsername from "./changeUser.js";
import changePassword from "./changePass.js";
import deleteUser from "./deleteUser.js";

// Variables
const title = document.getElementById("titleUser");
const logOutLink = document.getElementById("logOutLink");
const settingsLink = document.getElementById("settingsLink");
const settingsDiv = document.getElementById("settings");
const exitSettings = document.getElementById("exitSettings");
const searchLink = document.getElementById("searchLink");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("searchResults");
const savePassBtn = document.getElementById("savePassword");
const saveUserBtn = document.getElementById("saveUsername");
const deleteUserBtn = document.getElementById("deleteBtn");
const settingsAlert = document.getElementById("settingsAlert");

// Listeners
window.onload = () => {
  onloadFunction();
};

logOutLink.addEventListener("click", logOut);
settingsLink.addEventListener("click", openSettings);
exitSettings.addEventListener("click", closeSettings);
saveUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  changeUsername();
})
savePassBtn.addEventListener("click", (e) => {
  e.preventDefault();
  changePassword();
})
deleteUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  deleteUser();
})

searchBtn.addEventListener("click", () =>
  searchMovies(searchInput.value, resultsContainer)
);
searchInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    searchMovies(searchInput.value, resultsContainer);
  }
});
searchLink.addEventListener("click", () => {
  let topC = searchInput.offsetTop - 65;
  window.scrollTo({ top: topC });
});

// Functions
function onloadFunction() {
  let username = localStorage.getItem("loggedInTMDBUser");
  title.innerText = "Welcome, " + JSON.parse(username);
  if (!username) {
    window.location = "index.html";
    return;
  }
}

function logOut() {
  localStorage.removeItem("loggedInTMDBUser");
  window.location = "index.html";
}

function openSettings() {
  if (settingsDiv.style.opacity == 0) {
    settingsDiv.style.opacity = 1;
    settingsDiv.style.display = "block";
  } else {
    closeSettings();
  }
}

export default function closeSettings() {
  settingsDiv.style.opacity = 0;
  settingsDiv.style.display = "none";
  let inputs = settingsDiv.getElementsByTagName('input');
  for(let i of inputs){
    i.value = '';
  }
  settingsAlert.innerText = '';
}

renderLists("watchlist");
renderLists("ratedMovies");
renderLists("favorites");
