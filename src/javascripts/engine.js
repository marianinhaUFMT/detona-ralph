const state = {

    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },

    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        live: 3,
    },

    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function gameOver() {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.values.live = 3;
    state.view.lives.textContent = state.values.live;
    alert("Game Over! Your final score is: " + state.values.result);
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        gameOver();
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

// function moveEnemy() {
//     state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
// }

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("click", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else {
                state.values.live--;
                state.view.lives.textContent = state.values.live;
                if (state.values.live === 0) {
                    gameOver();
                }
            }
        });
    });
}

function init() {
    addListenerHitBox();
}

init();