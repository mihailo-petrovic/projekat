function renderLists(list) {
  const wlCont = document.getElementById("watchlistCont");
  const ratedCont = document.getElementById("ratedCont");
  const favsCont = document.getElementById("favoritesCont");

  let username = JSON.parse(localStorage.getItem("loggedInTMDBUser"));
  let users = JSON.parse(localStorage.getItem("projectTMDBUsers"));
  let user = users.find((el) => el.username === username);

  if (user.watchlist.length == 0) {
    wlCont.innerHTML = "<h3>No movies in the watchlist</h3>";
    wlCont.style.display = "flex";
    wlCont.style.alignItems = "center";
    wlCont.style.justifyContent = "center";
  } else {
    // RENDER MOVIES
  }

  if (user.ratedMovies.length == 0) {
    ratedCont.innerHTML = "<h3>No movies in rated movies</h3>";
    ratedCont.style.display = "flex";
    ratedCont.style.alignItems = "center";
    ratedCont.style.justifyContent = "center";
  } else {
    // RENDER MOVIES
  }

  if (user.favorites.length == 0) {
    favsCont.innerHTML = "<h3>No movies in favorites</h3>";
    favsCont.style.display = "flex";
    favsCont.style.alignItems = "center";
    favsCont.style.justifyContent = "center";
  } else {
    // RENDER MOVIES
  }
}

export default renderLists;
