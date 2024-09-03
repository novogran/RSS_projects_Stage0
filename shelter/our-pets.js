document.addEventListener("DOMContentLoaded", function() {
    let menu = document.getElementById("burger");
    let button = document.getElementById("burger-btn");
    let links = document.getElementsByClassName('burger-menu-item');
    let overlay = document.getElementById('burger-menu-overlay');
    let body = document.getElementById('html');
    button.addEventListener("click", (e) => {
        e.preventDefault();
        toggleMenu();
    });
    for(let item of links){
        item.addEventListener('click', () => toggleMenu());
    }
    document.getElementById('burger-menu-link-about').addEventListener('click', () => toggleMenu());
    overlay.addEventListener('click', () => toggleMenu());
    function toggleMenu(){
        if (menu.classList.contains('burger-menu-active')) {
            menu.classList.remove('burger-menu-active');
            body.style.overflow = 'visible';
        } else {
            menu.classList.add('burger-menu-active');
            body.style.overflow = 'hidden';
        }
    }
});