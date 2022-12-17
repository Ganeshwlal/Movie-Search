
const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
 const BASE_URL = 'https://api.themoviedb.org/3';
 const API_URL = BASE_URL + '/discover/movie? sort_by=popularity.desc&'+ API_KEY;
 const IMG_URL = 'https://image.tmdb.org/t/p/w500'

 const searchURL = BASE_URL + '/search/movie?' +API_KEY;
//  console.log(searchURL);

//  https://api.themoviedb.org/3search/movie?api_key=1cf50e6248dc270629e802686245c2c8&query=${}
 
 const main = document.getElementById('main');

 const form = document.getElementById('form');
 const search = document.getElementById('search')
//  https://api.themoviedb.org/3/discover/movie? sort_by=popularity.desc&api_key=1cf50e6248dc270629e802686245c2c8

 getMovies(API_URL)

 function getMovies(url){
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.results)
    showMovies(data.results)
    })
 }

 function showMovies(data){
    main.innerHTML= ' ';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movie-info">
                <h2>${title}</h2>
                <span class="${getColor(vote_average)}"><h4>${vote_average}</h4></span>
            </div>
            <div class="overview">
                <h3>overview</h3>
                <p>${overview}</p>

            </div>
        `

        main.appendChild(movieEl);

    })
 }

  function getColor(vote){
    if(vote>=8){
        return 'green'
    }
    else if(vote>=5){
        return "orange"
    }
    else{
        return "red"
    }
  }


  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const search1=search.value;
    if(search1){
        getMovies(searchURL+'&query='+search1)
    }
    else{
        getMovies(API_URL)
    }

  } )
