function renderList(list) {
  const container = document.getElementById(list + "InnerCont");
  const sortSelect = document.getElementById("sortBySelect");
  let username = JSON.parse(localStorage.getItem("loggedInTMDBUser"));
  let users = JSON.parse(localStorage.getItem("projectTMDBUsers"));
  let user = users.find((el) => el.username === username);
  let keys = Object.keys(user);
  let listName = keys.find((k) => k === list);
  let listFinal = user[listName];

  if (listFinal.length == 0) {
    container.innerHTML = `<h3>No movies in the 
    ${
      list === "watchlist"
        ? "watchlist"
        : list === "ratedMovies"
        ? "rated movies"
        : "favorites"
    }</h3>`;
    return;
  }

  sortArray(sortSelect, list, listFinal);
  container.innerHTML = "";
  for (let el of listFinal) {
    let movieDiv = document.createElement("div");
    movieDiv.dataset.id = el.id;
    movieDiv.classList.add("movieEmpty");
    container.appendChild(movieDiv);

    let divs = container.getElementsByClassName("movieEmpty");
    let id = el.id;
    let rating = el.rating;
    let moviePromise = getMovie(id);
    moviePromise
      .then((movie) => {
        let item = renderListItem(movie, rating);
        for (let d of divs) {
          if (d.dataset.id === id) {
            d.innerHTML = item;
            return;
          }
        }
      })
      .then(() => {
        let removeBtns = container.querySelectorAll(".removeBtn");
        let movieTitles = container.querySelectorAll(".movieTitle");
        let movieImgs = container.querySelectorAll(".listImg");
        for (let b of removeBtns) {
          b.addEventListener("click", (e) => removeFromList(e));
        }
        for (let t of movieTitles) {
          t.addEventListener("click", (e) => moreInfo(e));
        }
        for (let img of movieImgs) {
          img.addEventListener("click", (e) => moreInfo(e));
        }
      });
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
        <img src="${imgSrc}" class="listImg" data-id=${movie.id}  />
      </div>
      <div class="listTitleDiv">
        <h4 data-id=${movie.id} class="movieTitle">${movie.title}</h4>
        <p>${rating} / 5</p>
        <button class="btn removeBtn" data-id=${movie.id}>Remove</button>
      </div> 
    </div>
    <hr class="listHr">
  `;
  } else {
    htmlStr = `
    <div class="listItem">
      <div class="listImgDiv">
        <img src="${imgSrc}" class="listImg" data-id=${movie.id}  />
      </div>
      <div class="listTitleDiv">
        <h4 data-id=${movie.id} class="movieTitle">${movie.title}</h4>
        <button class="btn removeBtn" data-id=${movie.id}>Remove</button>
      </div> 
    </div>
    <hr class="listHr">
  `;
  }
  return htmlStr;
}

function moreInfo(e) {
  e.stopImmediatePropagation();
  let movieID = e.target.dataset.id;
  let moviePromise = getMovie(movieID);
  let container = document.getElementById("moreInfoCont");

  moviePromise.then((movie) => {
    const imagePath = "https://image.tmdb.org/t/p/w300/";
    let imgSrc = movie.poster_path ? imagePath + movie.poster_path : "";
    container.style.opacity = 1;
    container.style.zIndex = 100;
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";

    container.innerHTML = `
      <h1 id='exitMoreInfo'>&#x2716;</h1>
      <h2 id='moreInfoTitle'>${movie.title}</h2>
      <div id='moreInfoGrid'>      
        <div id='moreInfoTextDiv'>
          <p><strong>Original title: </strong> ${movie.original_title}</p>
          <p><strong>Release date: </strong> ${movie.release_date}</p>
          <p><strong>Production companies:</strong> ${(function () {
            let pcStr = "";
            for (let c of movie.production_companies) {
              pcStr += c.name + ", ";
            }
            pcStr = pcStr.substring(0, pcStr.length - 2);
            return pcStr;
          })()}</p>
          <p><strong>Production countries:</strong> ${(function () {
            let pcStr = "";
            for (let c of movie.production_countries) {
              pcStr += c.name + ", ";
            }
            pcStr = pcStr.substring(0, pcStr.length - 2);
            return pcStr;
          })()}</p>
        </div>
        <div id='moreInfoImgDiv'>
          <img src=${imgSrc ? imgSrc : ""} alt="No image available" />
        </div>
      </div>
    `;
    let exitMoreInfo = document.getElementById("exitMoreInfo");
    exitMoreInfo.addEventListener("click", () => {
      container.style.opacity = 0;
      container.style.zIndex = -100;
      container.innerHTML = "";
      document.body.style.overflow = "visible";
      document.body.style.height = "auto";
    });
  });
}

function removeFromList(e) {
  e.stopImmediatePropagation();
  let btn = e.target;
  let username = JSON.parse(localStorage.getItem("loggedInTMDBUser"));
  let users = JSON.parse(localStorage.getItem("projectTMDBUsers"));
  let user = users.find((u) => u.username === username);
  let movieID = btn.dataset.id;
  let listId = btn.parentElement.parentElement.parentElement.parentElement.id;
  let divElement = btn.parentElement.parentElement.parentElement;
  let list;
  switch (listId) {
    case "watchlistInnerCont":
      list = "watchlist";
      break;
    case "ratedMoviesInnerCont":
      list = "ratedMovies";
      break;
    case "favoritesInnerCont":
      list = "favorites";
      break;
  }
  let userList = user[list];
  let movieIndex = userList.findIndex((m) => m.id === movieID);
  userList.splice(movieIndex, 1);
  localStorage.setItem("projectTMDBUsers", JSON.stringify(users));
  divElement.remove();
  if (userList.length === 0) {
    renderList(list);
  }
}

function sortArray(sortSelect, list, listFinal) {
  if (sortSelect.value === "ratingDesc" && list === "ratedMovies") {
    listFinal.sort((a, b) => {
      return b.rating - a.rating;
    });
  } else if (sortSelect.value === "ratingAsc" && list === "ratedMovies") {
    listFinal.sort((a, b) => {
      return a.rating - b.rating;
    });
  } else {
    listFinal.sort((a, b) => {
      return new Date(a.time) - new Date(b.time);
    });
  }
}
export default renderList;
