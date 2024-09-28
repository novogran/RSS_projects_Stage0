document.addEventListener("DOMContentLoaded", function () {
    let img_conteiner = document.getElementById("img-conteiner")
    let searchInput = document.getElementById("search")
    let search_img = document.getElementById("search-img")
    let clear_brn = document.getElementById("clear-brn-conteiner")


    async function getData(search) {
        try {
            const res = await fetch(urlConstructor(search))
            const data = await res.json()
            drawImg(data)
        } catch (res) {
            if(res.status != 200)
            console.log("Error: "+res.status)
        }
        
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

    searchInput.addEventListener('keyup', e => {
        (searchInput.value != '')? clear_brn.style.display = 'block' : clear_brn.style.display = 'none'
        if (e.key === 'Enter') {
            search_img.click()
        }
    })

    search_img.addEventListener('click', () => {
        clearImg()
        getData(searchInput.value)
    })

    clear_brn.addEventListener('click', () => {
        searchInput.value = ''
        clear_brn.style.display = 'none'
        searchInput.focus()
    })

    getData('lakes')
})

