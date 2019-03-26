//js obsluga slidera
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function currentDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-white", "");
    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " w3-white";
}
setInterval(function () { plusDivs(1); }, 8000);


//Scroll top
var scrollTop = document.querySelector('.scroll__top');
window.onscroll = function(){
   if(window.pageYOffset >= 900) {
       scrollTop.style.display = 'block';
   }
   else {
       scrollTop.style.display = 'none';
   }
};

scrollTop.addEventListener('click', function(){
   window.scrollTo(0, 0);
});
//Formularz kontaktowy
var toggle = document.querySelector('.toggle');
       var sidebar = document.querySelector('.sidebar__contact')
       toggle.addEventListener('click', function(){
            sidebar.classList.toggle('active');
            toggle.classList.toggle('active');
});
//Menu active

let header = document.getElementById("navbar__active");
let btns = header.getElementsByClassName("btn");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  let current = document.getElementsByClassName("active__btn");
  if (current.length > 0) { 
    current[0].className = current[0].className.replace(" active__btn", "");
  }
  this.className += " active__btn";
  });
}

let nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () =>{
        if(window.scrollY){
            nav.classList.add('scroll');
        }
        else {
            nav.classList.remove('scroll');
        }
    });