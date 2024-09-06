document.addEventListener("DOMContentLoaded", function() {

    let menu = document.getElementById("burger");
    let burger_button = document.getElementById("burger-btn");
    let links = document.getElementsByClassName('burger-menu-item');
    let burger_overlay = document.getElementById('burger-menu-overlay')
    let body = document.getElementById('html');
    let cardsSlider =  document.getElementById('cards-slider-ul')
    let popup_overlay = document.getElementById('popup-overlay')
    let cardsArray = new Array()
    let next_button = document.getElementById('button-next')
    let prev_button = document.getElementById('button-previous')
    let start_button = document.getElementById('button-start')
    let end_button = document.getElementById('button-end')
    let page_button = document.getElementById('button-page')

    fetch('https://rolling-scopes-school.github.io/novogran-JSFEPRESCHOOL2024Q2/shelter/pets.json')
        .then(response => response.json())
        .then(json => {

            cardConstructor(6)

            // function clearCards(){
            //     for(let i = cardsSlider.children.length; i > 0 ; i--){
            //         cardsSlider.children[0].remove()
            //     } 
            // }

            function cardConstructor(cardCount){
                for(let i = 0; i<cardCount; i++){
                    let cardsSet = new Set()
                    while(cardsSet.size !=8){
                        cardsSet.add(json[(Math.floor(Math.random() * json.length))])
                    }
                    cardsArray = cardsArray.concat(Array.from(cardsSet))
                }
                // if(setJson.size == 0) setJson = new Set(json)

                // while(cardSet.size < cardCount){
                //     cardSet.add(Array.from(setJson)[(Math.floor(Math.random() * Array.from(setJson).length))])
                // }
                
                for(let object of cardsArray){
                    let cardLi = document.createElement('li')
                    cardLi.setAttribute('z-index', 5)
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

            burger_button.addEventListener("click", (e) => {
                e.preventDefault();
                toggleMenu();
            });
            for(let item of links){
                item.addEventListener('click', () => toggleMenu());
            }
            document.getElementById('burger-menu-link-about').addEventListener('click', () => toggleMenu());
            burger_overlay.addEventListener('click', () => toggleMenu());
            function toggleMenu(){
                if (menu.classList.contains('burger-menu-active')) {
                    menu.classList.remove('burger-menu-active');
                    body.style.overflow = 'visible';
                } else {
                    menu.classList.add('burger-menu-active');
                    body.style.overflow = 'hidden';
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
                    for(let item of json){
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
                }
            }

            burger_button.addEventListener("click", (e) => {
                e.preventDefault()
                toggleMenu()
            });

            let width = 1240
            let count = 1

            let list = document.getElementById('cards-slider-ul')
            let listElems = document.getElementById('cards-slider-ul').getElementsByClassName('animalcard')
            let position = 0
            let page = 1

            next_button.addEventListener("click", (e) => {
                if(page_button.innerHTML < 6) page_button.innerHTML = ++page
                position -= width * count;
                position = Math.max(position, -width * ((listElems.length/8) - count));
                list.style.marginLeft = position + 'px';
            });
            prev_button.addEventListener("click", (e) => {
                if(page_button.innerHTML > 1) page_button.innerHTML = --page
                position += width * count;
                position = Math.min(position, 0)
                list.style.marginLeft = position + 'px';
            });
            start_button.addEventListener("click", (e) => {

            });
            end_button.addEventListener("click", (e) => {

            });

        })
});