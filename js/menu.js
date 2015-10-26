(function() {

    var link = document.querySelector(".main-nav__toggle");
    var menu = document.querySelector(".main-nav");
    var close = document.querySelector(".main-nav__toggle--close");

    link.addEventListener("click", function(event) {
        event.preventDefault();
        menu.classList.toggle("main-nav--active");
        link.classList.toggle("main-nav__toggle--close");
    });

})();