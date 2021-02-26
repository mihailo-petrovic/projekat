import searchMovies from "./searchMovies.js";
import renderLists from "./renderLists.js";

// Variables
const title = document.getElementById("titleUser");
const logOutLink = document.getElementById("logOutLink");
const settingsLink = document.getElementById("settingsLink");
const searchLink = document.getElementById("searchLink");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const listContainer = document.getElementById("listCont");
const resultsContainer = document.getElementById("searchResults");

// Listeners
window.onload = () => {
  onloadFunction();
};

logOutLink.addEventListener("click", logOut);

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

renderLists("watchlist");
renderLists("ratedMovies");
renderLists("favorites");
