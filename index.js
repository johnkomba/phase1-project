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
    fetch(`http://www.omdbapi.com/?s=${query}&apikey=YOUR_API_KEY`)
    .then(response => response.json())
    .then(data => {
        if (data.Response === 'True') {
            data.Search.forEach(movie => {
                const listItem = document.createElement('li');
                listItem.textContent = `${movie.Title} (${movie.Year})`;
                movieList.appendChild(listItem);
            });
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = 'No movies found';
            movieList.appendChild(listItem);
        }
