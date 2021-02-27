function renderLists(list) {
  let username = JSON.parse(localStorage.getItem("loggedInTMDBUser"));
  let users = JSON.parse(localStorage.getItem("projectTMDBUsers"));
  let user = users.find((el) => el.username === username);
  let keys = Object.keys(user);
  let listName = keys.find((k) => k === list);
  let listFinal = user[listName];

  var container = document.getElementById(list + "InnerCont");

  if (listFinal.length == 0) {
    container.innerHTML = `<h3>No movies in the 
    ${
      list === "watchlist"
        ? "watchlist"
        : list === "ratedMovies"
        ? "rated movies"
        : "favorites"
    }</h3>`;
  } else {
    let htmlStr = "";
    for (let el of listFinal) {
      let id = el.id;
      let movie = getMovie(id);
      htmlStr += `<h3>${id}</h3>`
    }
    container.innerHTML = htmlStr;
  }
}

function getMovie(movieID) {
  const fetchUrl = "https://api.themoviedb.org/3/movie/";
  const api_key = "4809e2c8d7aced296b24cc62c56871c4";
  let url = fetchUrl + movieID + "?api_key=" + api_key;

  const fetchedMovie = fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch(console.error);
  return fetchedMovie;
}

export default renderLists;
