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
    container.innerHTML = "";
    for (let el of listFinal) {
      let id = el.id;
      let rating = el.rating;
      let moviePromise = getMovie(id);
      moviePromise.then((movie) => {
        if (rating) {
          let item = renderListItem(movie, rating);
          container.innerHTML += item;
          return;
        }
        let item = renderListItem(movie);
        container.innerHTML += item;
      });
    }
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

function renderListItem(movie, rating) {
  const imagePath = "https://image.tmdb.org/t/p/w300/";
  let imgSrc = movie.poster_path ? imagePath + movie.poster_path : "";
  let htmlStr;

  if (rating) {
    htmlStr = `
    <div class="listItem">
      <div class="listImgDiv">
        <img src="${imgSrc}" class="listImg" />
      </div>
      <div class="listTitleDiv">
        <h4>${movie.title}</h4>
        <p>${rating} / 5</p>
        <button class="btn">Remove</button>
      </div> 
    </div>
    <hr class="listHr">
  `;
  } else {
    htmlStr = `
    <div class="listItem">
      <div class="listImgDiv">
        <img src="${imgSrc}" class="listImg" />
      </div>
      <div class="listTitleDiv">
        <h4>${movie.title}</h4>
        <button class="btn">Remove</button>
      </div> 
    </div>
    <hr class="listHr">
  `;
  }
  return htmlStr;
}

export default renderLists;
