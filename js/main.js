const container = document.getElementById("cont");

fetch(
  "https://api.themoviedb.org/4/search/movie?api_key=4809e2c8d7aced296b24cc62c56871c4&query=pirates"
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.results[2].id);
    console.log(data.results[2].original_title);
    console.log(data.results[2].overview);
    console.log(data.results[2].title);
    container.innerHTML += `
      <img class='logo_small' src='https://image.tmdb.org/t/p/w300${data.results[2].poster_path}'></img>
    `
    for (let i = 1; i <= data.total_pages; i++) {
      fetch(
        `https://api.themoviedb.org/4/search/movie?api_key=4809e2c8d7aced296b24cc62c56871c4&query=pirates&page=${i}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);          
        });
    }
  });
