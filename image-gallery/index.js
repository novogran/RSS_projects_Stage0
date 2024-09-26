document.addEventListener("DOMContentLoaded", function () {
    let img_conteiner = document.getElementById("img-conteiner")
    let searchInput = document.getElementById("search")
    let search_img = document.getElementById("search-img")


    async function getData(search) {
        const res = await fetch(urlConstructor(search));
        const data = await res.json();
        drawImg(data)
    }

    function urlConstructor(search) {
        const baseUrl = 'https://api.unsplash.com/search/photos?query='
        const endindRequest = '&per_page=30&orientation=landscape&client_id=DdjB2SU1HU34sF3ZUWuyXPSVg6z0ZvtBJnACokmvvcE'
        return (search == '') ? baseUrl + 'lakes' + endindRequest : baseUrl + search + endindRequest
    }

    function drawImg(data) {
        for (let item of data.results) {
            let img = document.createElement('img')
            img.setAttribute('src', item.urls.small)
            img.setAttribute('alt', 'img')
            img_conteiner.append(img)
            img.addEventListener('click', () => {
                window.open(item.urls.full, '_blank')
            })
        }
    }

    function clearImg() {
        for (let item of img_conteiner.querySelectorAll('img')) {
            item.remove()
        }
    }

    searchInput.addEventListener('enter', (e) => {
        console.log('work')
        if (e.keyCode === 13) {
            console.log('work')
            search_img.click()
        }
    })

    search_img.addEventListener('click', () => {
        clearImg()
        getData(searchInput.value)
    })

    getData('lakes')
})
