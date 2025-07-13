import Atropos from './node_modules/atropos/atropos.min.mjs';

$(document).ready(function () { //Cuando el documento html este totalmente cargado
    $(".menu-toggle").click(function () { //Cuando haga click sobre el elemento con clase .menu-toggle
        $(".nav-list").toggleClass("show");
        $(".bar:nth-child(1)").toggleClass("rotate-45");
        $(".bar:nth-child(2)").toggleClass("hide");
        $(".bar:nth-child(3)").toggleClass("rotate45");
    });

    $(".navLinks").click(function () { //Cuando haga click sobre el elemento con clase .menu-toggle
        $(".nav-list").toggleClass("show");
        $(".bar:nth-child(1)").toggleClass("rotate-45");
        $(".bar:nth-child(2)").toggleClass("hide");
        $(".bar:nth-child(3)").toggleClass("rotate45");
    });
});

ScrollReveal().reveal('.rightEntrance', { delay: 200, distance: '100%', origin: 'right' });
ScrollReveal().reveal('.leftEntrance', { delay: 200, distance: '100%', origin: 'left' });
ScrollReveal().reveal('.bottomEntrance', { delay: 200, distance: '100%', origin: 'bottom' });
ScrollReveal().reveal('.topEntrance', { delay: 200, distance: '100%', origin: 'top' });

const myAtropos = Atropos({
    el: '.my-atropos',
    activeOffset: 40,
    shadowScale: 2,
});
const mAtropos = Atropos({
    el: '.my-atropos2',
    activeOffset: 40,
    shadowScale: 2,
});
const tropos = Atropos({
    el: '.my-atropos3',
    activeOffset: 40,
    shadowScale: 2,
});