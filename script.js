const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="
const IMGPATH = "https://image.tmdb.org/t/p/w1280"

const main = document.querySelector("main")
const form = document.querySelector("form")
const search = document.querySelector(".search")
const homeButton = document.getElementById('home-button')

getMovies(APIURL)

async function getMovies(url) {
    const resp = await fetch(url)
    const respData = await resp.json()
    showMovies(respData.results)
}

function showMovies(movies){
    main.innerHTML = ''
    
    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview, release_date} = movie
        const releaseYear = release_date.split("-")
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML = `
        <img 
            src="${IMGPATH + poster_path}"
            alt="${title}" 
        />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getRatingColor(vote_average)}">${
            vote_average
        }</span>
        </div>
        <div class="overview">
            <h4>Release Year:</h4>
            <p>${releaseYear[0]}</p>
            <h3>Plot:</h3>
            <p>${overview}</p>
        </div>
        `

        main.appendChild(movieEl)
    })
}

function getRatingColor(movie) {
    if (movie >= 8) {
        return "green"
    } else if (movie >= 6) {
        return "orange"
    } else {
        return "red"
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm)
        search.value = ""
    }
})

homeButton.addEventListener('click',()=>{
    window.location.reload()
})
