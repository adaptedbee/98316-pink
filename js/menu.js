(function() {

    var link = document.querySelector(".main-nav__toggle");
    var menu = document.querySelector(".main-nav");
    var close = document.querySelector(".main-nav__toggle--close");
    var topmenu = document.querySelector(".top-menu");

    link.addEventListener("click", function(event) {
        menu.classList.toggle("main-nav--active");
        link.classList.toggle("main-nav__toggle--close");
        topmenu.classList.toggle("top-menu--active");
    });

})();