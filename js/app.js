const hamburger = document.querySelector('.hamburger');
const menuIcon = document.querySelector('.hamburger img');
const navMenu = document.querySelector('.mobileNav');

hamburger.addEventListener('click', (e)=> {
  if(navMenu.classList.contains('active')) {
    navMenu.classList.remove('active')
    menuIcon.src = './images/icon-hamburger.svg';
  }else {
    navMenu.classList.add('active');
    menuIcon.src = './images/icon-close.svg';
  }
})

