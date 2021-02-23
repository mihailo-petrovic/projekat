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
    let imgSrc = imagePath + movie.poster_path;
    container.innerHTML += `
    <details class="movieTag">
        <summary> <h4>${movie.original_title}</h4> </summary>
        <div>
            <img src=${imgSrc}>
        </div>
    </details>
    <hr><br>
      `;
  });
}

export default searchMovies;
