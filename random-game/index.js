document.addEventListener("DOMContentLoaded", function () {
    const snake_screen = document.getElementById('snake')
    const main_menu_screen = document.getElementById('main_menu')
    const game_over_screen = document.getElementById('game_over')
    const setting_screen = document.getElementById('settings')
    const leaderboard = document.getElementById('leaderboard')
    const score = document.getElementById('score')
    const ctx = snake_screen.getContext("2d");

    let food = { x: 0, y: 0 }
    let snake
    let snake_next_dir
    let snake_dir
    let wall = true

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
            setWall(wall_input.value)
        })

    function screenSwitch(option) {
        switch (option) {

            case 0: snake_screen.style.display = "flex"
                main_menu_screen.style.display = "none"
                setting_screen.style.display = "none"
                game_over_screen.style.display = "none"
                leaderboard.style.display = "none"
                break

            case 1: snake_screen.style.display = "none"
                main_menu_screen.style.display = "flex"
                setting_screen.style.display = "none"
                game_over_screen.style.display = "none"
                leaderboard.style.display = "none"
                break

            case 2: snake_screen.style.display = "none"
                main_menu_screen.style.display = "none"
                setting_screen.style.display = "flex"
                game_over_screen.style.display = "none"
                leaderboard.style.display = "none"
                break

            case 3: snake_screen.style.display = "none"
                main_menu_screen.style.display = "none"
                setting_screen.style.display = "none"
                game_over_screen.style.display = "flex"
                leaderboard.style.display = "none"
                break

            case 4: snake_screen.style.display = "none"
                main_menu_screen.style.display = "none"
                setting_screen.style.display = "none"
                game_over_screen.style.display = "none"
                leaderboard.style.display = "flex"
                break
        }
    }

    function changeDir(key) {
        switch (key) {
            case 'ArrowUp' && snake_dir != 2:
                snake_next_dir = 0
                break
            case 'ArrowDown' && snake_dir != 3:
                snake_next_dir = 1
                break
            case 'ArrowLeft' && snake_dir != 0:
                snake_next_dir = 2
                break
            case 'ArrowRight' && snake_dir != 1:
                snake_next_dir = 3
                break
        }
    }

    function createFood() {
        food.x = Math.floor(Math.random() * ((snake_screen.width / 10) - 1))
        food.y = Math.floor(Math.random() * ((snake_screen.height / 10) - 1))
        for (let snake_part of snake) {
            if (food.x == snake_part.x && food.y == snake_part.y) createFood()
        }
    }

    function activeDot(x, y) {
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(x * 10, y * 10, 10, 10)
    }

    function selfEatingCheck() {
        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                screenSwitch(3)
                return
            }
        }
    }

    function eatingFoodCheck() {
        if (food.x == snake[0].x && food.y == snake[0].y) {
            snake[snake.length] = { x: snake[0].x, y: snake[0].y }
            score.innerHTML = score.value++
            addFood()
            activeDot(food.x, food.y)
        }
    }

    function newGame() {
        screenSwitch(0)
        snake_screen.focus()
        snake = []
        for (let i = 4; i >= 0; i--) {
            snake.push({ x: i, y: 15 })
        }

        snake_next_dir = 1

        score.innerHTML = 0
        createFood()
        changeDir(window.key)
        mainLoop()
    }

    function mainLoop() {

        let _x = snake[0].x
        let _y = snake[0].y
        snake_dir = snake_next_dir

        switch (snake_dir) {
            case 0: _y--;
                break;
            case 1: _x++;
                break;
            case 2: _y++;
                break;
            case 3: _x--;
                break;
        }
        snake.pop()
        snake.unshift({ x: _x, y: _y })
        if (wall == true) {
            if (snake[0].x < 0 || snake[0].x === snake_screen.width / 10
                || snake[0].y < 0 || snake[0].y === snake_screen.height / 10) {
                screenSwitch(3)
                return
            }
        } else {
            for (let i = 0, x = snake.length; i < x; i++) {
                if (snake[i].x < 0) {
                    snake[i].x = snake[i].x + (snake_screen.width / 10)
                }
                if (snake[i].x == snake_screen.width / 10) {
                    snake[i].x = snake[i].x - (snake_screen.width / 10)
                }
                if (snake[i].y < 0) {
                    snake[i].y = snake[i].y + (snake_screen.height / 10)
                }
                if (snake[i].y == snake_screen.height / 10) {
                    snake[i].y = snake[i].y - (snake_screen.height / 10)
                }
            }
        }

        selfEatingCheck()
        eatingFoodCheck()
        ctx.beginPath()
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, snake_screen.width, snake_screen.height)

        for (let i = 0; i < snake.length; i++) {
            activeDot(snake[i].x, snake[i].y);
        }

        activeDot(food.x, food.y)

        setTimeout(mainLoop, 150)
    }

    function setWall(hasWall) {
        wall = hasWall
        if (wall) {
            snake_screen.style.borderColor = "#606060"
        } else {
            snake_screen.style.borderColor = "#FFFFFF"
        }
    }
})