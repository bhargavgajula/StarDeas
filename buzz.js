document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.search-box');
    const input = form.querySelector('input[type="search"]');
    const resultsContainer = document.querySelector('.results');
    const resultsCounter = document.querySelector('header p');

    // Set the default search term
    const defaultSearchTerm = "business and startups";

    // Set the input value to the default search term
    input.value = defaultSearchTerm;

    // Perform the initial search when the page loads
    searchWikipedia(defaultSearchTerm);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // No need to check for user input; always use the default search term
        searchWikipedia(defaultSearchTerm);
    });

    function searchWikipedia(searchTerm) {
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(searchTerm)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayResults(data.query.search);
            })
            .catch(error => alert('Error : ' + error));
    }

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        resultsCounter.textContent = `Results Count : ${results.length}`;
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'result';
            resultElement.innerHTML = `
                <h3>${result.title}</h3>
                <p>${result.snippet}</p>
                <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Read More</a>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }
});
