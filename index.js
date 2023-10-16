document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', () => {
        const searchInput = document.getElementById('searchInput').value;
        searchMovies(searchInput);
        // Show the like button after search results are displayed
        likeButton.style.display = 'block';
    });
});

    const likeButton = document.getElementById('likeButton');

    likeButton.addEventListener('click', () => {
        const likeCount = document.getElementById('likeCount');
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    });

    const checkbox = document.getElementById('subscribeCheckbox');

    checkbox.addEventListener('change', () => {
        const subscriptionStatus = document.getElementById('subscriptionStatus');
        subscriptionStatus.textContent = checkbox.checked ? 'Subscribed' : 'Unsubscribed';
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
                // Fetch additional details about the movie using its imdbID
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
                        `;
                        movieList.appendChild(listItem);
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
