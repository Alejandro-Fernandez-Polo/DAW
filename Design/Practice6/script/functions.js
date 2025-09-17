$(document).ready(function () {
  $(".menu-toggle").click(function () {
    $(".nav-list").toggleClass("show");
    $(".bar:nth-child(1)").toggleClass("rotate-45");
    $(".bar:nth-child(2)").toggleClass("hide");
    $(".bar:nth-child(3)").toggleClass("rotate45");
  });
});

///SCROLL FUNCTION
window.addEventListener("scroll", function () {
  progreso();
})

function progreso() {
  let scroll = document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let progreso = (scroll / height) * 100;
  document.getElementsByClassName("barra")[0].style.width = progreso + "%";
}

ScrollReveal().reveal('.rightEntrance', { delay: 200, distance: '100%', origin: 'right' });
ScrollReveal().reveal('.leftEntrance', { delay: 200, distance: '100%', origin: 'left' });
ScrollReveal().reveal('.bottomEntrance', { delay: 200, distance: '100%', origin: 'bottom' });