fetch('https://rolling-scopes-school.github.io/novogran-JSFEPRESCHOOL2024Q2/shelter/pets.json')
    .then(response => response.json())
    .then(json => {
        for(let object of json){
            console.log(object);
            const card = document.getElementById('animal-img');
            card.setAttribute('src', object.img);
        }
    });

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
    document.getElementById('burger-menu-item-about').addEventListener('click', () => toggleMenu());
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

console.log("1.Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n2.Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14\n3.Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n4.Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\n5.Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\n6.Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\n7.Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\n8.Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции: +8\n9.При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\n10.Верстка обеих страниц валидная: +8")