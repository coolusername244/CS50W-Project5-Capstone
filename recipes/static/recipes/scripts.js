import { apiKey } from './secrets.js'

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
        let url
        let cuisine;
        let dietary = [];
        let intolerances = [];
        let nutritionalInfo = [];
        // get users recipe query
        const query = document.querySelector('#recipe').value.toLowerCase()
        // iterate through form fields appending values to relevant lists
        Array.from(searchForm.elements).forEach((input) => {
            if (input.type === 'radio' && input.checked && input.parentElement.parentElement.parentElement.parentElement.id === 'cuisine') {
                cuisine = input.id
            }
            if (input.type === 'checkbox' && input.checked && input.parentElement.parentElement.parentElement.parentElement.id === 'dietary') {
                dietary.push(input.id)
            }
            if (input.type === 'checkbox' && input.checked && input.parentElement.parentElement.parentElement.parentElement.id === 'intolerances') {
                intolerances.push(input.id)
            }
            if (input.type === 'text' && input.value) {
                nutritionalInfo.push(`&${input.name}=${input.value}`)
            }
        });
        // url-ify lists
        let dietaryUrl = dietary.join(',').replace(/,/g, '%2C').split();
        let intolerancesUrl = intolerances.join(',').replace(/,/g, '%2C').split();
        let nutritionalInfoUrl = nutritionalInfo.join(',').replace(/,/g, '').split();
        // declare url for api query
        url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}${cuisine?'&cuisine='+cuisine:''}${dietaryUrl!=0?'&diet='+dietaryUrl:''}${intolerancesUrl!=0?'&intolerances='+intolerancesUrl:''}&instructionsRequired=true&addRecipeInformation=true${nutritionalInfoUrl!=0?nutritionalInfoUrl:''}&apiKey=${apiKey}`
        

        const options = {
            method: 'GET',
        };
        fetch(url, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    })

});

