import renderLists from "./renderLists.js";

function addToList(e, list) {
  let movieID = e.target.dataset.id;
  let username = JSON.parse(localStorage.getItem("loggedInTMDBUser"));
  let users = JSON.parse(localStorage.getItem("projectTMDBUsers"));
  let index = users.findIndex((u) => u.username === username);
  let user = users.find((u) => u.username === username);
  let favorites = user.favorites;
  let watchlist = user.watchlist;
  let ratedMovies = user.ratedMovies;

  if (list === "favorites") {
    if (favorites.find((x) => x.id === movieID) !== undefined) {
      return;
    }
    favorites.push({ id: movieID, time: new Date() });
    users.splice(index, 1, user);
    localStorage.setItem("projectTMDBUsers", JSON.stringify(users));
    renderLists("favorites");
    return;
  }

  if (list === "watchlist") {
    if (watchlist.find((x) => x.id === movieID) !== undefined) {
      return;
    }
    watchlist.push({ id: movieID, time: new Date() });
    users.splice(index, 1, user);
    localStorage.setItem("projectTMDBUsers", JSON.stringify(users));
    renderLists("watchlist");
    return;
  }

  if (list === "ratedMovies") {
    if (ratedMovies.find((x) => x.id === movieID) !== undefined) {
      return;
    }
    ratedMovies.push({ id: movieID, rating: e.target.value, time: new Date() });
    users.splice(index, 1, user);
    localStorage.setItem("projectTMDBUsers", JSON.stringify(users));
    renderLists("ratedMovies");
    return;
  }
}

export default addToList;
