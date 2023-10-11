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
