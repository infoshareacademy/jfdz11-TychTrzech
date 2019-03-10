<!--js obsluga slidera-->
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

var modal = document.getElementById("Simplemodal");
var modalBtn = document.getElementById("button__modal");
var closeBtn = document.getElementById("close");

modalBtn.addEventListener("click", openModal);
function openModal() {
    modal.style.display = "block";
}

closeBtn.addEventListener("click", closeModal);
function closeModal() {
    modal.style.display = "none";
}