document.addEventListener('DOMContentLoaded', createResultsList);

// Toggle mobile menu
const hamburgerMenu = document.getElementById('hamburger-menu');
const headerMenu = document.getElementsByClassName('header-menu')[0];
const container = document.getElementById('container');

hamburgerMenu.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
    headerMenu.classList.toggle('show');
    document.body.classList.toggle('stop-scroll');
}

// ------------------------------- URL SHORTENING ------------------------------- //

const userInput = document.getElementById('enter-url'); // input tag
const labelInput = document.getElementById('label-input') // label tag 
const form = document.getElementById('shortening-form'); // form tag
const resultsDiv = document.getElementById('user-results'); // div tag for results inserted dynamically

form.addEventListener('submit', getUserInput);

// Retrieves user input and verifies it
function getUserInput(e) {
    e.preventDefault();

    if (userInput.value === '') {

        // if user submits empty form, display red message and box for 3 seconds
        labelInput.classList.toggle('error');
        userInput.classList.toggle('error');
        setTimeout(removeErrors, 3000);
    }

    var cleanInput = userInput.value;

    shortenUrlWithApi(cleanInput)

    userInput.value = '';
}

// Connects to URL shortner Api and shortens user search
function shortenUrlWithApi(userURL) {
    fetch(`https://api.shrtco.de/v2/shorten?url=${userURL}`)
    .then(response => response.json())
    .then(data => storeResults(data));
}

// Retrieves the original and shortened link from the JSON and stores it in local storage
function storeResults(data) {
    var longLink = data.result.original_link;
    var shortLink = data.result.full_short_link2;

    var storageItem = {
        search: longLink,
        result: shortLink
    }

    if (localStorage) {
        var json = localStorage.getItem('storedLinks') || '{"links": []}';
        var arr = JSON.parse(json);
        arr.links.push(storageItem);
        localStorage.setItem("storedLinks", JSON.stringify(arr))
    }

    createResultsList();
}

// Creates dynamic elements to show the user their search and previous searches
function createResultsList() {
    resultsDiv.style.display = "flex";
    clearResultsDiv();

    if (localStorage.getItem('storedLinks') === null) {
        return;
    }

    else {
        // Retrieves all links from local storage
        var storedItems = localStorage.getItem('storedLinks');
        var linksArray = JSON.parse(storedItems);
        var allLinks = linksArray.links;
    }
    
    // Loop through the array of links to display all of them 
    for (let i = 0; i < allLinks.length; i++) {
        var currentLink = allLinks[i];
        var search = currentLink.search;
        var result = currentLink.result;

        var itemResult = `<li>
                            <span class="long-link">${search}</span>
                            <div class="result-right-side">
                                <span class="short-link">${result}</span>
                                <button class="green-button copy-button" data-link="link-">Copy</button>
                            </div>
                        </li>`;

        resultsDiv.innerHTML += itemResult;
    }
    
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => button.addEventListener('click', copyLink))
}

// Gives the 'copy link' button its active color and copy to clipboard
function copyLink() {
    console.log('copy link');

    let copyColor = this.style.backgroundColor;
    this.style.backgroundColor = copyColor ? '' : "#3B3054"; 
    this.style.outline = 'none';
    this.innerText = 'Copied!';

    // The link being in a span tag, we need to place its text in a textarea to be able
    // copy to the clipboard
    const shortLinkCopied = this.previousElementSibling.innerText;
    var textArea = document.createElement('textarea');
    textArea.value = shortLinkCopied;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();

    console.log(shortLinkCopied);
}

// Toggle classes for error styles to show and hide
function removeErrors() {
    labelInput.classList.toggle('error');
    userInput.classList.toggle('error');
    return;
}

// Clears the results div before adding any children
function clearResultsDiv() {
    while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.firstChild);
    }
}