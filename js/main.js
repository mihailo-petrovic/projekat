import searchMovies from "./searchMovies.js";
import showResults from "./searchMovies.js";

window.onload = () => {
  if (!localStorage.getItem("loggedInTMDBUser")) {
    window.location = "index.html";
  }
};

// Variables
const logOutLink = document.getElementById("logOutLink");
const settingsLink = document.getElementById("settingsLink");
const searchLink = document.getElementById("searchLink");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const listContainer = document.getElementById("listCont");
const resultsContainer = document.getElementById("searchResults");

let user = JSON.parse(localStorage.getItem("loggedInTMDBUser"));
// let watchlist = user.watchlist;
// let likedMovies = user.likedMovies;
// let ratedMovies = user.ratedMovies;

// Listeners
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
  window.scrollTo({top: topC})
});

// Functions
function logOut() {
  localStorage.removeItem("loggedInTMDBUser");
  window.location = "index.html";
}
