document.addEventListener("DOMContentLoaded", function() {

    let menu = document.getElementById("burger")
    let button = document.getElementById("burger-btn")
    let links = document.getElementsByClassName('burger-menu-item')
    let overlay = document.getElementById('burger-menu-overlay')
    let body = document.getElementById('html')
    let arrow_previous = document.getElementById('button-arrow-previous')
    let arrrow_next = document.getElementById('button-arrow-next')
    let cardSetPrevious = new Set()
    let cardSetNext = new Set()
    let cardSet = new Set()
    let setJson = new Set()
    let prevFlag = false
    let nextFlag = false

    fetch('https://rolling-scopes-school.github.io/novogran-JSFEPRESCHOOL2024Q2/shelter/pets.json')
        .then(response => response.json())
        .then(json => {

            let cardsSlider =  document.getElementById('slider')

            if(window.matchMedia("(max-width: 562px)").matches) {
                cardConstructor(1)
            } else {
                if(window.matchMedia("(max-width: 904px)").matches) {
                    cardConstructor(2)
                } else {cardConstructor(3)}
            }

            window.matchMedia('(max-width: 904px)').addEventListener('change', (e) => {
                if(!e.matches){ 
                    clearCards()
                    cardConstructor(3)
                } else {
                    clearCards()
                    cardConstructor(2)
                }
            })

            window.matchMedia('(max-width: 562px)').addEventListener('change', (e) => {
                if(e.matches){
                    clearCards()
                    cardConstructor(1)
                } else {
                    clearCards()
                    cardConstructor(2)
                }
            })

            function clearCards(){
                for(let i = cardsSlider.children.length-1; i>1; i--) {
                    cardsSlider.children[1].remove()
                }  
            }
            
            function cardConstructor(cardCount){
                console.log(cardSet)
                if(setJson.size == 0) setJson = new Set(json)
                if(prevFlag){
                    cardSet = new Set(cardSetPrevious)
                    prevFlag = !prevFlag
                } else {
                    if(nextFlag) {
                        cardSet = new Set(cardSetNext)
                        nextFlag = !nextFlag
                    }
                }

                while(cardSet.size < cardCount){
                    cardSet.add(Array.from(setJson)[(Math.floor(Math.random() * Array.from(setJson).length))])
                }
                console.log(cardSet.size)
                
                for(let object of cardSet){
                    let animalcard = document.createElement('div')
                    document.getElementById('button-arrow-next').before(animalcard)
                    animalcard.setAttribute('class', "animalcard")
                    animalcard.setAttribute('id', "animalcard")
                    let img = document.createElement('img')
                    img.setAttribute('src', object.img)
                    img.setAttribute('alt', "animal")
                    img.setAttribute('id', "animal-img")
                    animalcard.appendChild(img)
                    let text = document.createElement('h4')
                    text.setAttribute('class', "animalcard-text")
                    text.setAttribute('id', "animalcard-text")
                    text.innerHTML = object.name
                    animalcard.appendChild(text)
                    let button = document.createElement('button')
                    button.setAttribute('class', "animalcard-button")
                    button.setAttribute('type', "button")
                    button.innerHTML = 'Learn more'
                    animalcard.appendChild(button)
                }
            }

            arrow_previous.addEventListener('click', () => {
                setJson = new Set(json)
                setJson = new Set(setJson.difference(cardSet))
                cardSetPrevious = new Set(cardSet)
                prevFlag = true
                nextFlag = false
                cardSet.clear()
                if(cardSetNext.size > 0) {
                    if(cardSetNext.has(cardSet)) cardSet = new Set(cardSetNext)
                }
                for(let card of document.getElementsByClassName('animalcard')){
                    card.classList.add('animalcard-animation')
                }
                clearCards()
                if(window.matchMedia("(max-width: 562px)").matches) {
                    cardConstructor(1)
                } else {
                    if(window.matchMedia("(max-width: 904px)").matches) {
                        cardConstructor(2)
                    } else {cardConstructor(3)}
                }
            })

            arrrow_next.addEventListener('click', () => {
                setJson = new Set(json)
                setJson = new Set(setJson.difference(cardSet))
                cardSetNext = new Set(cardSet)
                nextFlag = true
                prevFlag = false
                cardSet.clear()
                if(cardSetPrevious.size > 0) {
                    if(cardSetPrevious.has(cardSet)) cardSet = new Set(cardSetPrevious)
                } 
                clearCards()
                if(window.matchMedia("(max-width: 562px)").matches) {
                    cardConstructor(1)
                } else {
                    if(window.matchMedia("(max-width: 904px)").matches) {
                        cardConstructor(2)
                    } else {cardConstructor(3)}
                }
            })
        });

    
    button.addEventListener("click", (e) => {
        e.preventDefault()
        toggleMenu()
    });

    for(let item of links){
        item.addEventListener('click', () => toggleMenu())
    }

    document.getElementById('burger-menu-item-about').addEventListener('click', () => toggleMenu())
    overlay.addEventListener('click', () => toggleMenu())
    function toggleMenu(){
        if (menu.classList.contains('burger-menu-active')) {
            menu.classList.remove('burger-menu-active')
            body.style.overflow = 'visible'
        } else {
            menu.classList.add('burger-menu-active')
            body.style.overflow = 'hidden'
        }
    }
});

console.log("1.Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n2.Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14\n3.Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n4.Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\n5.Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\n6.Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\n7.Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\n8.Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции: +8\n9.При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\n10.Верстка обеих страниц валидная: +8")