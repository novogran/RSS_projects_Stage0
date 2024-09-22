document.addEventListener("DOMContentLoaded", function () {
    const playPauseButton = document.getElementById("play-button")
    const nextButton = document.getElementById("forward-button")
    const prevButton = document.getElementById("backward-button")
    const progressBar = document.getElementById("song-progress-bar")
    const volumeBtn = document.getElementById('volume-button')
    const volumeSlider = document.getElementById('volume-slider')

    const tracks = [
        {
            artist: 'Beyonce',
            title: "Don't Hurt Yourself",
            audio: './assets/audio/beyonce.mp3',
            img: './assets/img/lemonade.png'
        }
        ,
        {
            artist: 'Dua Lipa',
            title: "Don't Start Now",
            audio: './assets/audio/dontstartnow.mp3',
            img: './assets/img/dontstartnow.png'
        }]
    const audio = new Audio('./assets/audio/beyonce.mp3')
    audio.addEventListener(
        "loadeddata",
        () => {
            document.getElementById("song-time").innerText = getTimeCodeFromNum(audio.duration)
            progressBar.setAttribute('max', audio.duration)
            document.getElementById('volume-percentage').style.height = (1 - audio.volume) * 100 + '%'
        },
        false
    );
    let playFlag = false
    let songNum = 0
    let songTime = 0

    playPauseButton.addEventListener('click', () => {
        (playFlag) ? pauseAudio() : playAudio()
    })

    nextButton.addEventListener('click', () => {
        nextSong()
        playAudio()
        drawSongInfo()
    })

    prevButton.addEventListener('click', () => {
        prevSong()
        playAudio()
        drawSongInfo()
    })

    progressBar.oninput = function () {
        songTime = progressBar.value
        playAudio()
    }

    function playAudio() {
        playPauseButton.setAttribute('src', './assets/svg/pause.png')
        audio.src = tracks[songNum].audio
        if (songTime > 0) {
            audio.currentTime = songTime
        } else {
            progressBar.value = 0
            audio.currentTime = 0
        }
        audio.play()
        playFlag = true
    }

    function pauseAudio() {
        playPauseButton.setAttribute('src', './assets/svg/play.png')
        songTime = audio.currentTime
        audio.pause()
        playFlag = false
    }

    function nextSong() {
        (songNum < tracks.length - 1) ? songNum++ : songNum = 0
        songTime = 0
    }

    function prevSong() {
        (songNum > 0) ? songNum-- : songNum = tracks.length - 1
        songTime = 0
    }

    function drawSongInfo() {
        document.getElementById("song-img").setAttribute('src', tracks[songNum].img)
        document.getElementById("artist").innerText = tracks[songNum].artist
        document.getElementById("title").innerText = tracks[songNum].title
        document.getElementById("background").style.backgroundImage = "url(" + tracks[songNum].img + ")"

    }


    setInterval(() => {
        progressBar.value = audio.currentTime
        document.getElementById('song-duration').textContent = getTimeCodeFromNum(
            audio.currentTime
        )
    }, 500)

    function getTimeCodeFromNum(num) {
        let seconds = parseInt(num)
        let minutes = parseInt(seconds / 60)
        seconds -= minutes * 60
        const hours = parseInt(minutes / 60)
        minutes -= hours * 60

        if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(
            seconds % 60
        ).padStart(2, 0)}`
    }

    volumeBtn.addEventListener("click", () => {
        audio.muted = !audio.muted
        if (audio.muted) {
            document.getElementById('volume-percentage').style.height = 100 + '%'
            volumeBtn.setAttribute('src', './assets/img/no-audio.png')
        } else {
            document.getElementById('volume-percentage').style.height = (1 - audio.volume) * 100 + '%'
            volumeBtn.setAttribute('src', './assets/img/sound.png')
        }
    });

    
    volumeSlider.addEventListener('click', e => {
        audio.muted = false
        volumeBtn.setAttribute('src', './assets/img/sound.png')
        const sliderHeight = window.getComputedStyle(volumeSlider).height
        const newVolume = e.offsetY / parseInt(sliderHeight)
        audio.volume = 1 - newVolume
        document.getElementById('volume-percentage').style.height = newVolume * 100 + '%'
    }, false)
})

