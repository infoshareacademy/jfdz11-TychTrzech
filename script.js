// Slider
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function currentDiv(n) {
  showDivs((slideIndex = n));
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " w3-white";
}
setInterval(function() {
  plusDivs(1);
}, 8000);

// Scroll top
var scrollTop = document.querySelector(".scroll__top");
window.onscroll = function() {
  if (window.pageYOffset >= 900) {
    scrollTop.style.display = "block";
  } else {
    scrollTop.style.display = "none";
  }
};

scrollTop.addEventListener("click", function() {
  window.scrollTo(0, 0);
});

// Contact form
var toggle = document.querySelector(".toggle");
var sidebar = document.querySelector(".sidebar__contact");
toggle.addEventListener("click", function() {
  sidebar.classList.toggle("active");
  toggle.classList.toggle("active");
});

// Menu active
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

let nav = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY) {
    nav.classList.add("scroll");
  } else {
    nav.classList.remove("scroll");
  }
});

// Scrool Active button
let btn_1 = document.getElementById("btn_1");
let btn_2 = document.getElementById("btn_2");
let btn_3 = document.getElementById("btn_3");
let btn_4 = document.getElementById("btn_4");

window.onscroll = function() {
  console.log(window.pageYOffset);
  if (window.pageYOffset >= 740) {
    btn_1.classList.add("active__btn");
    btn_2.classList.remove("active__btn");
  }
  if (window.pageYOffset <= 720) {
    btn_1.classList.remove("active__btn");
  }
  if (window.pageYOffset >= 1259) {
    btn_1.classList.remove("active__btn");
    btn_2.classList.add("active__btn");
    btn_3.classList.remove("active__btn");
  }
  if (window.pageYOffset >= 2393) {
    btn_2.classList.remove("active__btn");
    btn_3.classList.add("active__btn");
  }
};

// Cookies
let cookie = document.querySelector(".accept-cookies");

cookie.addEventListener("click", function() {
  let acceptCookie = "ciasteczko";
  localStorage.setItem("cookies", acceptCookie);
  let cookiePopup = document.querySelector(".cookie-popup");
  if (localStorage.getItem("cookies") === "ciasteczko") {
    cookiePopup.style.display = "none";
  }
});
let cookiePopup = document.querySelector(".cookie-popup");
if (localStorage.getItem("cookies") === "ciasteczko") {
  cookiePopup.style.display = "none";
}
