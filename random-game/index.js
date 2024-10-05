document.addEventListener("DOMContentLoaded", function () {
    const snake_screen = document.getElementById('snake')
    const main_menu_screen = document.getElementById('main_menu')
    const game_over_screen = document.getElementById('game_over')
    const setting_screen = document.getElementById('settings')
    const leaderboard = document.getElementById('leaderboard')
    const score = document.getElementById('score')

    for (let new_game_button of document.querySelectorAll('#new_game_button')) {
        new_game_button.addEventListener('click', () => {
            newGame()
        })
    }

    for (let settings_menu of document.querySelectorAll('#settings_menu')) {
        settings_menu.addEventListener('click', () => {
            screenSwitch(2)
        })
    }

    for (let leaderboard_button of document.querySelectorAll('#leaderboard_button')) {
        leaderboard_button.addEventListener('click', () => {
            screenSwitch(4)
        })
    }

    for (let wall_input of document.getElementById('settings').querySelectorAll('input'))
        wall_input.addEventListener('click', () => {
            setWall(wall_input.value);
        })

    function screenSwitch(option) {
        switch (option) {

            case 0: snake_screen.style.display = "flex";
                main_menu_screen.style.display = "none";
                setting_screen.style.display = "none";
                game_over_screen.style.display = "none";
                leaderboard.style.display = "none";
                break;

            case 1: snake_screen.style.display = "none";
                main_menu_screen.style.display = "flex";
                setting_screen.style.display = "none";
                game_over_screen.style.display = "none";
                leaderboard.style.display = "none";
                break;

            case 2: snake_screen.style.display = "none";
                main_menu_screen.style.display = "none";
                setting_screen.style.display = "flex";
                game_over_screen.style.display = "none";
                leaderboard.style.display = "none";
                break;

            case 3: snake_screen.style.display = "none";
                main_menu_screen.style.display = "none";
                setting_screen.style.display = "none";
                game_over_screen.style.display = "flex";
                leaderboard.style.display = "none";
                break;

            case 4: snake_screen.style.display = "none";
                main_menu_screen.style.display = "none";
                setting_screen.style.display = "none";
                setting_screen.style.display = "none";
                leaderboard.style.display = "flex";
                break;
        }
    }

    function newGame() {
        let snake = []
        screenSwitch(0)
        snake_screen.focus()
    }

    function setWall(hasWall) {
        (hasWall) ? snake_screen.style.borderColor = "#606060" : snake_screen.style.borderColor = "#FFFFFF"
    }
})