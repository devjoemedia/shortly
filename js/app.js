const hamburger = document.querySelector(".hamburger");
const menuIcon = document.querySelector(".hamburger img");
const navMenu = document.querySelector(".mobileNav");
const url = document.querySelector(".url");
const shortenIt = document.querySelector(".shorten-it");
const linksContainer = document.querySelector(".links");
const copyBtn = document.querySelector(".copy_link");
const clearBtn = document.querySelector(".clear");


// change menu icon
hamburger.addEventListener("click", (e) => {
  if (navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    menuIcon.src = "./images/icon-hamburger.svg";
  } else {
    navMenu.classList.add("active");
    menuIcon.src = "./images/icon-close.svg";
  }
});

// clear localStorage
clearBtn.addEventListener('click', ()=> {
  localStorage.clear();
  window.location = '/'
})

// make request to shorten url api
const shortenLink = () => {
  if (url.value) {
    let linksArray = [];

    if (localStorage.getItem("links")) {
      if (localStorage.getItem("links").length > 0) {
        linksArray = JSON.parse(localStorage.getItem("links"));
      } else {
        linksArray = [];
      }
    }
    
    fetch(`https://api.shrtco.de/v2/shorten?url=${url.value}`)
    .then((res) => res.json())
    .then((data) => {
      linksArray.push({
        long_url: data.result.original_link,
        short_url: data.result.short_link,
      });
      console.log(linksArray);
      localStorage.setItem("links", JSON.stringify(linksArray));
      let info = `
        <div class="links__link">
          <p class="long-url">${data.result.original_link.slice(
            0,
            40
            )} ...</p>
            <p class="short-url">${data.result.short_link}</p>
            <button class="btn btn-secondary copy_link">copy!</button>
        </div>
        `;
        linksContainer.insertAdjacentHTML("beforeend", info);
        clearBtn.style.display = 'block';
      })
      .catch((err) => console.log(err));
    url.value = "";
  } else {
    url.style.border = "2px solid red";
    setTimeout(() => {
      url.style.border = "none";
    }, 3000);
  }
};

shortenIt.addEventListener("click", shortenLink);

// Show links from localstorage on page load
window.onload = ()=> {
  if (localStorage.getItem("links")) {
    if (localStorage.getItem("links").length > 0) {
      clearBtn.style.display = 'block';
      JSON.parse(localStorage.getItem("links")).map(link => {
        console.log(link);
        let info = `
        <div class="links__link">
            <p class="long-url">${link.long_url.slice(
              0,
              40
            )} ...</p>
            <span class="short-url">${link.short_url}</span>
            <button class="btn btn-secondary copy_link">copy!</button>
          </div>
        `;
        linksContainer.insertAdjacentHTML("beforeend", info);
      })
    } 
  }
}

// Event Bubbling & copy url
linksContainer.addEventListener('click', (e)=> {
  if(e.target.classList.contains('copy_link')){
    e.target.textContent = 'copied!';
    e.target.style.background = '#3b3054';
    /* Get the text  */
    let inputElement = document.createElement('input');
    linksContainer.appendChild(inputElement);

    inputElement.value = e.target.parentNode.children.item(1).textContent;

    /* Select the text field */
    inputElement.select();
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
    // remove element after selection
    linksContainer.removeChild(inputElement);
    setTimeout(()=>{
      e.target.textContent = 'copy';
      e.target.style.background = '#2acfcf';
    },2000)
  }
});