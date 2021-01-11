const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=39f74df54609f4a4cbc2b0a3df4c77fd&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=39f74df54609f4a4cbc2b0a3df4c77fd&query="'

const main = document.getElementById('main')
const header = document.getElementById('header')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const {
            title,
            poster_path,
            vote_average,
            overview
        } = movie

        console.log(setTimeout(`${IMG_PATH + poster_path}`, 2500))

        const movieEL = document.createElement('div')
        movieEL.innerHTML = `
            <div class="card">
                <div class="card-header animated-bg" id="header">
                <img src="${IMG_PATH + poster_path}" alt="${title}" class=""></div>
                <div class="card-content">
                    <h3 class="card-title " id="title">${title}</h3>
                    <p class="card-excerpt" id="excerpt">
                        ${overview}
                        <span class="">&nbsp;</span>
                        <span class="">&nbsp;</span>
                        <span class="">&nbsp;</span>
                    </p>
                </div>
            </div>
        `

        main.appendChild(movieEL)
    })
}



function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    } else {
        window.location.reload()
    }
})