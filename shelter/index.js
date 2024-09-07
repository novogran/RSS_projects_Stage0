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
    let setJson = new Set()
    let cardsSlider =  document.getElementById('cards-slider-ul')
    let cardsArray = new Array()

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
                    cardConstructor(3)
                } else {
                    cardConstructor(2)
                }
            })

            window.matchMedia('(max-width: 562px)').addEventListener('change', (e) => {
                if(e.matches){
                    cardConstructor(1)
                } else {
                    cardConstructor(2)
                }
            })
            
            function cardConstructor(cardCount){
                if(setJson.size == 0) setJson = new Set(json)

                for(let i = 0; i<3; i++){
                    let cardSet = new Set()
                    while(cardSet.size < cardCount){
                        cardSet.add(Array.from(setJson)[(Math.floor(Math.random() * Array.from(setJson).length))])
                    }
                    cardsArray.push(cardSet)
                }
                
                for(let object of cardsArray){
                    drawCard(object,'')
                }
                for(let card of document.getElementsByClassName('animalcard')){
                    card.addEventListener('click', () => togglePopup(card.getElementsByTagName('h4')[0]))
                }
            }

            let width = 1080
            let cardsList = document.getElementById('cards-slider-ul')
            let cardsCount = 3

            if(window.matchMedia("(max-width: 581px)").matches) {
                width = 270
                cardsCount = 1
            } else {
                if(window.matchMedia("(max-width: 1279px)").matches) {
                    width = 580
                    cardsCount = 2
                }
            }

            window.matchMedia('(max-width: 1279px)').addEventListener('change', (e) => {
                if(!e.matches){
                    width = 1080
                    cardsCount = 3
                } else {
                    width = 580
                    cardsCount = 2
                }
            })

            window.matchMedia('(max-width: 581px)').addEventListener('change', (e) => {
                if(e.matches){
                    width = 270
                    cardsCount = 1
                } else {
                    width = 580
                    cardsCount = 2
                }
            })

            arrrow_next.addEventListener('click', () => {

                let cardSet = new Set()
                while(cardSet.size < cardsCount){
                    let randomAnimal = Array.from(setJson)[(Math.floor(Math.random() * Array.from(setJson).length))]
                    if(!cardsArray[cardsArray.length-1].has(randomAnimal))
                    cardSet.add(randomAnimal)
                }
                cardsArray.push(cardSet)
                    drawCard(cardsArray[cardsArray.length-1], '')
                    for(let i=0; i<cardsCount; i++){
                        document.getElementById('cards-slider-ul').querySelector('li').remove()
                    }

                    cardsArray.shift()
                    cardsList.style.transition = 'none'
                    cardsList.style.marginLeft = 0 + 'px';

                    setTimeout(() => {
                        cardsList.style.transition = '1000ms'
                        cardsList.style.marginLeft = -width + 'px'
                      }, 100)
            })

            arrow_previous.addEventListener('click', () => {

                let cardSet = new Set()
                while(cardSet.size < cardsCount){
                    let randomAnimal = Array.from(setJson)[(Math.floor(Math.random() * Array.from(setJson).length))]
                    if(!cardsArray[0].has(randomAnimal))
                    cardSet.add(randomAnimal)
                }
                cardsArray.unshift(cardSet)
                drawCard(cardsArray[0],'left')

                    for(let i=0; i<cardsCount; i++){
                        let a = document.getElementById('cards-slider-ul').querySelectorAll('li')
                        a[a.length-1].remove()
                    }

                    cardsArray.pop()
                    cardsList.style.transition = 'none'
                    cardsList.style.marginLeft = -width*2 + 'px';

                    setTimeout(() => {
                        cardsList.style.transition = '1000ms'
                        cardsList.style.marginLeft = -width + 'px'
                      }, 100)
                    
            })

            function drawCard(cardsArray,direction){
                for(let item of cardsArray){
                    let cardLi = document.createElement('li')
                    if(direction == 'left'){
                        document.getElementById('cards-slider-ul').prepend(cardLi)
                    } else {
                        document.getElementById('cards-slider-ul').append(cardLi)
                    }
                    let animalcard = document.createElement('div')
                    cardLi.append(animalcard)
                    animalcard.setAttribute('class', "animalcard")
                    animalcard.setAttribute('id', "animalcard")
                    let img = document.createElement('img')
                    img.setAttribute('src', item.img)
                    img.setAttribute('alt', "animal")
                    img.setAttribute('id', "animal-img")
                    animalcard.appendChild(img)
                    let text = document.createElement('h4')
                    text.setAttribute('class', "animalcard-text")
                    text.setAttribute('id', "animalcard-text")
                    text.innerHTML = item.name
                    animalcard.appendChild(text)
                    let button = document.createElement('button')
                    button.setAttribute('class', "animalcard-button")
                    button.setAttribute('type', "button")
                    button.innerHTML = 'Learn more'
                    animalcard.appendChild(button)
                }
            }
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
                    document.getElementById('popup-age').innerHTML = item.age
                    document.getElementById('popup-inoculations').innerText = item.inoculations
                    document.getElementById('popup-diseases').innerText = item.diseases
                    document.getElementById('popup-parasites').innerText = item.parasites
                }
            }
        }
    }
});

console.log("1.Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n2.Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14\n3.Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n4.Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\n5.Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\n6.Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\n7.Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\n8.Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции: +8\n9.При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\n10.Верстка обеих страниц валидная: +8")