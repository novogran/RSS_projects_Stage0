document.addEventListener("DOMContentLoaded", function() {

    let menu = document.getElementById("burger")
    let popup = document.getElementById("popup")
    let burger_button = document.getElementById("burger-btn")
    let links = document.getElementsByClassName('burger-menu-item')
    let burger_overlay = document.getElementById('burger-menu-overlay')
    let popup_overlay = document.getElementById('popup-overlay')
    let body = document.getElementById('html')
    let arrow_previous = document.getElementById('button-arrow-previous')
    let arrrow_next = document.getElementById('button-arrow-next')
    let cardSetPrevious = new Set()
    let cardSetNext = new Set()
    let cardSet = new Set()
    let setJson = new Set()
    let prevFlag = false
    let nextFlag = false
    let cardsSlider =  document.getElementById('cards-slider-ul')

                let list = document.getElementById('cards-slider-ul')
                let width = 270
                let count = 3
                let position = 0
                let listElems = document.getElementById('cards-slider-ul').querySelectorAll('li')

    fetch('https://rolling-scopes-school.github.io/novogran-JSFEPRESCHOOL2024Q2/shelter/pets.json')
        .then(response => response.json())
        .then(json => {

            


            if(window.matchMedia("(max-width: 562px)").matches) {
                cardConstructor(1)
            } else {
                if(window.matchMedia("(max-width: 904px)").matches) {
                    cardConstructor(2)
                } else {
                    cardConstructor(3)
                }
            }

            window.matchMedia('(max-width: 904px)').addEventListener('change', (e) => {
                if(!e.matches){
                    cardSet.clear()
                    clearCards()
                    cardConstructor(3)
                } else {
                    cardSet.clear()
                    clearCards()
                    cardConstructor(2)
                }
            })

            window.matchMedia('(max-width: 562px)').addEventListener('change', (e) => {
                if(e.matches){
                    cardSet.clear()
                    clearCards()
                    cardConstructor(1)
                } else {
                    cardSet.clear()
                    clearCards()
                    cardConstructor(2)
                }
            })

            function clearCards(){
                for(let i = cardsSlider.children.length; i > 0 ; i--){
                    cardsSlider.children[0].remove()
                } 
            }
            
            function cardConstructor(cardCount){
                if(setJson.size == 0) setJson = new Set(json)
                // if(prevFlag){
                //     cardSet = new Set(cardSetPrevious)
                //     prevFlag = !prevFlag
                // } else {
                //     if(nextFlag) {
                //         cardSet = new Set(cardSetNext)
                //         nextFlag = !nextFlag
                //     }
                // }

                while(cardSet.size < cardCount){
                    cardSet.add(Array.from(setJson)[(Math.floor(Math.random() * Array.from(setJson).length))])
                }
                
                for(let object of cardSet){
                    let cardLi = document.createElement('li')
                    document.getElementById('cards-slider-ul').append(cardLi)
                    let animalcard = document.createElement('div')
                    cardLi.append(animalcard)
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
                for(let card of document.getElementsByClassName('animalcard')){
                    card.addEventListener('click', () => togglePopup(card.getElementsByTagName('h4')[0]))
                }
            }

            arrow_previous.addEventListener('click', () => {
                            
                // position -= width * count
                // position = Math.max(position, -width * (listElems.length - count))
                // position = 50
                // list.style.animation = 'scrolling-right 0.6s linear'

                setJson = new Set(json)
                setJson = new Set(setJson.difference(cardSet))
                cardSetPrevious = new Set(cardSet)
                prevFlag = true
                nextFlag = false
                cardSet.clear()
                if(cardSetNext.size > 0) {
                    if(cardSetNext.has(cardSet)) cardSet = new Set(cardSetNext)
                }
                // document.getElementById('cards-slider-ul').classList.add('animalcard-animation-right')
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

                // position += width * count
                // position = Math.min(position, 0)
                // position = -50
                // list.style.animation = 'scrolling-left 0.6s linear'

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
                
                // document.getElementById('cards-slider').classList.add('animalcard-animation-left')
            })
        });

    
    burger_button.addEventListener("click", (e) => {
        e.preventDefault()
        toggleMenu()
    });

    for(let item of links){
        item.addEventListener('click', () => toggleMenu())
    }

    document.getElementById('burger-menu-item-about').addEventListener('click', () => toggleMenu())
    burger_overlay.addEventListener('click', () => toggleMenu())
    function toggleMenu(){
        if (menu.classList.contains('burger-menu-active')) {
            menu.classList.remove('burger-menu-active')
            body.style.overflow = 'visible'
        } else {
            menu.classList.add('burger-menu-active')
            body.style.overflow = 'hidden'
        }
    }
    document.getElementById('close-button').addEventListener('click', () => togglePopup())
    popup_overlay.addEventListener('click', () => togglePopup())

    function togglePopup(text){
        if (popup.classList.contains('popup-active')) {
            popup.classList.remove('popup-active')
            body.style.overflow = 'visible'
        } else {
            popup.classList.add('popup-active')
            body.style.overflow = 'hidden'
        }

        if(text != undefined) {
            for(let item of setJson){
                if(item.name == text.innerText){
                    document.getElementById('popup-img').setAttribute('src', item.img)
                    document.getElementById('popup-name').innerText = item.name
                    document.getElementById('popup-breed').innerText = item.type + ' - ' + item.breed
                    document.getElementById('popup-text').innerText = item.description
                    document.getElementById('popup-age').innerHTML = 'Age: ' + item.age
                    document.getElementById('popup-inoculations').innerText = 'Inoculations: ' + item.inoculations
                    document.getElementById('popup-diseases').innerText = 'Diseases: ' + item.diseases
                    document.getElementById('popup-parasites').innerText = 'Parasites: ' + item.parasites
                }
            }
            // card.getElementById('name').innerHTML(car)
            // document.getElementById('content').getElementsByTagName('img').setAttribute('src',card.)
        }
    }
});

console.log("1.Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n2.Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14\n3.Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n4.Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\n5.Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\n6.Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\n7.Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\n8.Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции: +8\n9.При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\n10.Верстка обеих страниц валидная: +8")