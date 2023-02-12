import { apiKey } from './secrets.js';

$(document).ready(function(){
    // smooth dropdown show/hide
    $('.dropdown').on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').slideDown("fast", "swing");
    });
    $('.dropdown').on('hide.bs.dropdown', function() {
        $(this).find('.dropdown-menu').slideUp("fast", "swing");
    });
    // smooth advanced search show/hide
    $('#advanced-search').on('click', function() {
        $('.advanced-search-options').slideToggle("fast", "swing");
        $('#hide-advanced-search').css('display', 'inline');
        $('#advanced-search').css('display', 'none');
    });
    $('#hide-advanced-search').on('click', function() {
        $('.advanced-search-options').slideToggle("fast", "swing");
        $('#hide-advanced-search').css('display', 'none');
        $('#advanced-search').css('display', 'inline');
    });
    // search for recipes
    const searchForm = document.querySelector('#search-form');

    searchForm.addEventListener('submit', function(event) {
        // prevent form from submitting
        event.preventDefault();
        // declare variables and lists
        let url;
        let cuisine;
        let dietary = [];
        let intolerances = [];
        let nutritionalInfo = [];
        const searchError = document.querySelector('#search-error');
        // get users recipe query
        const query = document.querySelector('#recipe').value.toLowerCase(); 
        // iterate through form fields appending values to relevant lists
        Array.from(searchForm.elements).forEach((input) => {
            if (input.type === 'radio' && input.checked && input.parentElement.parentElement.parentElement.parentElement.id === 'cuisine') {
                cuisine = input.id;
            }
            if (input.type === 'checkbox' && input.checked && input.parentElement.parentElement.parentElement.parentElement.id === 'dietary') {
                dietary.push(input.id);
            }
            if (input.type === 'checkbox' && input.checked && input.parentElement.parentElement.parentElement.parentElement.id === 'intolerances') {
                intolerances.push(input.id);
            }
            if (input.type === 'text' && input.value) {
                nutritionalInfo.push(`&${input.name}=${input.value}`);
            }
        });
        // User must enter search criteria
        if (query.trim() === '' && cuisine === undefined && dietary.length === 0 && intolerances.length === 0 && nutritionalInfo.length === 0) {
            searchError.style.display = 'block';
            return;
        } else {
            searchError.style.display = 'none';
        }  
        // url-ify lists
        let dietaryUrl = dietary.join(',').replace(/,/g, '%2C').split();
        let intolerancesUrl = intolerances.join(',').replace(/,/g, '%2C').split();
        let nutritionalInfoUrl = nutritionalInfo.join(',').replace(/,/g, '').split();
        // declare url for api query
        url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}${cuisine?'&cuisine='+cuisine:''}${dietaryUrl!=0?'&diet='+dietaryUrl:''}${intolerancesUrl!=0?'&intolerances='+intolerancesUrl:''}&instructionsRequired=true&addRecipeInformation=true${nutritionalInfoUrl!=0?nutritionalInfoUrl:''}&apiKey=${apiKey}&number=9`;
        // send request and manage results
        const options = {
            method: 'GET',
        };
        fetch(url, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                // get results div and clear previous search
                let resultsDiv = document.querySelector('#results');
                if (resultsDiv.firstChild) {
                    resultsDiv.innerHTML = '';
                }
                // If search has no results
                if (!response.results.length) {
                    let colDiv = document.createElement('h4');
                    colDiv.classList.add('text-center');
                    colDiv.innerHTML = 'No results found, see if something else is on the menu!';
                    resultsDiv.append(colDiv);
                    return;
                }
                // Process each result in response
                for (let i = 0; i < response.results.length; i++) {                 
                    // create elements for each recipe result
                    let colDiv = document.createElement('div');
                    let cardDiv = document.createElement('div');
                    let image = document.createElement('img');
                    let cardBody = document.createElement('div');
                    let cardTitle = document.createElement('h5');
                    let readyInText = document.createElement('p');
                    let servingsText = document.createElement('p');
                    let recipeLink = document.createElement('a');
                    // add ttributes to each created element
                    colDiv.classList.add('col-12', 'col-md-4');
                    cardDiv.classList.add('card');
                    image.classList.add('card-img-top');
                    cardBody.classList.add('card-body');
                    cardTitle.classList.add('card-title');
                    readyInText.classList.add('card-text');
                    servingsText.classList.add('card-text');
                    recipeLink.classList.add('btn','btn-primary', 'view-recipe');
                    // add content to each element
                    image.src = response.results[i].image;
                    image.alt = response.results[i].title
                    cardTitle.innerHTML = response.results[i].title;
                    readyInText.innerHTML = `Ready in: ${response.results[i].readyInMinutes} minutes`;
                    servingsText.innerHTML = `Servings: ${response.results[i].servings}`;
                    recipeLink.innerHTML = 'View Recipe!';
                    // put result together for DOM
                    colDiv.append(cardDiv);
                    cardDiv.append(image, cardBody);
                    cardBody.append(cardTitle, readyInText, servingsText, recipeLink);
                    //create new row after every 3 results
                    if (i % 3 == 0) {
                        let rowDiv = document.createElement('div');
                        rowDiv.classList.add('row');
                        rowDiv.append(colDiv);
                        resultsDiv.append(rowDiv);
                    } else {
                        let resultsDiv = document.querySelector('#results');
                        let rows = resultsDiv.querySelectorAll('.row');
                        let lastRow = rows[rows.length-1];
                        lastRow.append(colDiv);
                    }
                }
            })
            .catch(err => console.error(err));
    });
});