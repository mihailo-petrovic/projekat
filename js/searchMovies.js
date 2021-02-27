import addToList from "./addToList.js";

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

  for (let movie of obj.results) {
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
            <button class="favsBtn btn"
             data-id=${movie.id}>Add To Favorites</button>
            <button class="wlBtn btn"
             data-id=${movie.id}>Watch Later</button>            
            <div class="rateDiv">
              <label for="rateMovie">Rate this movie:</label><br>
              <select data-id=${movie.id} name="rateMovie" class="rateMovie">
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
    let favBtns = document.querySelectorAll(".favsBtn");
    let wlBtns = document.querySelectorAll(".wlBtn");
    let ratedSelects = document.querySelectorAll(".rateMovie")
    favBtns.forEach((b) => {
      b.addEventListener("click", (e) => addToList(e, 'favorites'));
    });
    wlBtns.forEach((b) => {
      b.addEventListener("click", (e) => addToList(e, 'watchlist'));
    });
    ratedSelects.forEach(s => {
      s.addEventListener("change", (e) => addToList(e, 'ratedMovies'))
    })
  }
}

export default searchMovies;
