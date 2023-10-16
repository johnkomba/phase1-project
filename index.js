document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', () => {
        const searchInput = document.getElementById('searchInput').value;
        searchMovies(searchInput);
    });
});

function searchMovies(query) {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';
    const apiKey = 'fa82ab71';

    fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        if (data.Response === 'True') {
            data.Search.forEach(movie => {
                fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`)
                    .then(response => response.json())
                    .then(movieDetails => {
                        const listItem = document.createElement('li');
                        listItem.innerHTML = `
                            <h3>${movieDetails.Title} (${movieDetails.Year})</h3>
                            <p>Director: ${movieDetails.Director}</p>
                            <p>Genre: ${movieDetails.Genre}</p>
                            <p>Plot: ${movieDetails.Plot}</p>
                            <img src="${movieDetails.Poster}" alt="${movieDetails.Title}">
                            <button class="likeButton">Like</button>
                            <span class="likeCount">0</span>
                        `;
                        movieList.appendChild(listItem);
                        const likeButton = listItem.querySelector('.likeButton');
                        likeButton.addEventListener('click', () => {
                            const likeCount = listItem.querySelector('.likeCount');
                            likeCount.textContent = parseInt(likeCount.textContent) + 1;
                        });
                    });
            });
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = 'No movies found';
            movieList.appendChild(listItem);
        }
    })
    .catch(error => console.error('Error:', error));
    
}
