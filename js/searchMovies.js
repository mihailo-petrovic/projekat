function searchMovies(userInput, container) {
  if (userInput == "") {
    container.innerHTML = "";
    return;
  }

  const fetchUrl = "https://api.themoviedb.org/3/search/movie";
  const api_key = "4809e2c8d7aced296b24cc62c56871c4";

  let url =
    fetchUrl +
    "?api_key=" +
    api_key +
    "&query=" +
    searchInput.value +
    "&include_adult=false";
  fetch(url)
    .then((res) => res.json())
    .then((data) => showResults(data, container))
    .catch(console.error);
}

function showResults(obj, container) {
  const imagePath = "https://image.tmdb.org/t/p/w300/";
  container.innerHTML = "";
  if (obj.results.length == 0) {
    container.style.margin = "30px";
    container.innerHTML = `
        <h2>Sorry, no results found</h2>
    `;
    return;
  }

  obj.results.forEach((movie) => {
    // overview, release_date, id,
    let imgSrc = movie.poster_path ? imagePath + movie.poster_path : "";
    container.innerHTML += `
    <details class="movieTag">
        <summary> <h4>${movie.original_title}</h4> </summary>
        <div class="movieDiv">
          <div class="imgDiv">
            <img src=${imgSrc}>
          </div>
          <div class="overviewDiv">
            <h5>Overview:</h5>
            <p>${movie.overview ? movie.overview : "Not available"}</p>
          </div>
          <div class="actionsDiv">
            <button class="favsBtn btn">Add To Favorites</button>
            <button class="wlBtn btn">Watch Later</button>            
            <div class="rateDiv">
              <label for="rateMovie">Rate this movie:</label><br>
              <select name="rateMovie" class="rateMovie">
                <option default>-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>
    </details>
    <hr><br>
      `;
  });

  let watchlistBtns = document.querySelectorAll(".wlBtn");
  let favsBtns = document.querySelectorAll(".favsBtn");
  let rateSelects = document.querySelectorAll(".rateMovie");

  watchlistBtns.forEach((btn) => {
    btn.addEventListener("click", addToWatchlist);
  });
  favsBtns.forEach((btn) => {
    btn.addEventListener("click", addToFavs);
  });
  rateSelects.forEach((s) => {
    s.addEventListener("change", rateMovie);
  });
}

function addToWatchlist(e) {
  this.classList.add("disabledBtn");
  this.disabled = true;
  this.innerText = "Added";
}

function addToFavs(e) {
  this.classList.add("disabledBtn");
  this.disabled = true;
  this.innerText = "Added";
}

function rateMovie(e) {
  console.log(e.target.value);
}

export default searchMovies;
