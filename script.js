const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const chosenGame = parameters.get("name");

if (!chosenGame || (chosenGame !== "easy4x4" && chosenGame && "medium6x6" && chosenGame !== "hard8x8")) {
    window.location.href = "/difficulty.html";
}

let flipped = false;
let firstCard, secondCard;
let lock = false;

let points = 0;

let matchedCards = 0;

let highestScore = 0;

var myCanvas = document.createElement("canvas");
document.body.appendChild(myCanvas);

let myConfetti = confetti.create(myCanvas, {
    resize: true,
    useWorker: true,
});

myConfetti({
    particleCount: 100,
    spread: 180,
});

const memory_game = document.querySelector(".memory-game-wrapper");

let cards;

let musicMute = false;

const cardsArray = [
    "watermelon",
    "strawberry",
    "cherry",
    "lemon",
    "orange",
    "seven",
    "big_win",
    "plum",
    "diamond",
    "money",
    "card",
    "grape",
    "slot",
    "crown",
    "clock",
    "laptop",
    "microphone",
    "ball",
];

function displayByDifficulty() {
    switch (chosenGame) {
        case "easy4x4":
            memory_game.classList.add("easy");

            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 2; j++) {
                    memory_game.insertAdjacentHTML(
                        "beforeend",
                        `
                        <div class="memory-card" data-name="${cardsArray[i]}">
                            <img
                            class="front-face"
                            src="./images/${cardsArray[i]}.png"
                            draggable="false"
                            />
                            <div class="back-face"></div>
                        </div>
                 `
                    );
                }
            }
            break;

        case "medium6x6":
            memory_game.classList.add("medium");

            for (let i = 0; i < cardsArray.length; i++) {
                for (let j = 0; j < 2; j++) {
                    memory_game.insertAdjacentHTML(
                        "beforeend",
                        `
                        <div class="memory-card" data-name="${cardsArray[i]}">
                            <img
                            class="front-face"
                            src="./images/${cardsArray[i]}.png"
                            draggable="false"
                            />
                            <div class="back-face"></div>
                        </div>
                 `
                    );
                }
            }
            break;

        case "hard8x8":
            memory_game.classList.add("hard");
            let counter = 0;

            for (let i = 0; i < cardsArray.length; i++) {
                for (let j = 0; j < 4; j++) {
                    counter++;

                    if (counter > 64) {
                        break;
                    }

                    memory_game.insertAdjacentHTML(
                        "beforeend",
                        `
                        <div class="memory-card" data-name="${cardsArray[i]}">
                            <img
                            class="front-face"
                            src="./images/${cardsArray[i]}.png"
                            draggable="false"
                            />
                            <div class="back-face"></div>
                        </div>
                 `
                    );
                }
            }
            break;
    }

    cards = document.querySelectorAll(".memory-card");
    cards.forEach((card) => card.addEventListener("click", flipCard));

    timerEnd = false;

    timerCycle();

    // shuffle();
}

displayByDifficulty();

const updateScore = (updatedScore) => {
    document.getElementById("points").innerHTML = updatedScore;

    if (highestScore <= points) {
        highestScore = points;
        document.getElementById("highest-score").innerHTML = `Highest score: ${highestScore}`;
    }
};

function flipCard() {
    if (lock) return;
    if (this === firstCard) return;

    this.classList.toggle("flip");

    if (!flipped) {
        flipped = true;
        firstCard = this;

        return;
    } else {
        flipped = false;
        secondCard = this;

        match();

        if (chosenGame === "easy4x4" && matchedCards >= 8) {
            setTimeout(() => {
                alert(`Cestitamo. Osvojili ste ${points} poena.`);

                endGameDiv();

                setTimeout(() => {
                    document.getElementById("end-game").classList.add("active");
                }, 400);

                confetti();
            }, 600);
        } else if (chosenGame === "medium6x6" && matchedCards >= 18) {
            setTimeout(() => {
                alert(`Cestitamo. Osvojili ste ${points} poena.`);

                endGameDiv();

                setTimeout(() => {
                    document.getElementById("end-game").classList.add("active");
                }, 400);
            }, 600);
        } else if (chosenGame === "hard8x8" && matchedCards >= 32) {
            setTimeout(() => {
                alert(`Cestitamo. Osvojili ste ${points} poena.`);

                endGameDiv();

                setTimeout(() => {
                    document.getElementById("end-game").classList.add("active");
                }, 400);
            }, 600);
        }
    }
}

const endGameDiv = () => {
    timerEnd = true;

    if (!musicMute) {
        const audio = new Audio(
            highestScore >= points ? "./sound_effects/win.wav" : "./sound_effects/lose.wav"
        );
        audio.play();
        audio.volume = 0.4;
    }

    document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div class="end-game-container" id="end-game">
        <div class="end-game-wrapper">
            ${
                highestScore > points
                    ? `
                        <img
                            src="https://media0.giphy.com/media/9b5PGYzFoeLvy3RfJO/200w.gif?cid=82a1493b8fntvp2dlk4dh4662xaaw2ihl8g2sd45iahqryms&rid=200w.gif&ct=ts"
                            class="end-game-result defeat"
                        />
                        `
                    : `
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/5e8b72489729f93db98e5100/1586665216386-STQBMPBFZVY930LO7FRB/winner_bluelogo_main.png"
                            class="end-game-result victory"
                        />
                        `
            }

            <h1 id="highest-score">Highest score: ${highestScore}</h1>
            <h1 id="points">Points: ${points}</h1>
            <h2 id="timer">Time: ${timer.innerHTML}</h2>

            <div class="btns">
                <button class="btn-start" id="reset" onclick="resetBoard()">START OVER</button>
                <a href="/difficulty.html" style="text-decoration: none; color: #fff;">
                    <button class="btn-start" id="go-back">GO BACK</button>
                </a>
            </div>
        </div>
    </div>
        `
    );
};

const resetBoard = () => {
    memory_game.innerHTML = "";

    points = 0;
    resetingBoard();
    matchedCards = 0;

    timerReset();

    displayByDifficulty();
    document.getElementById("end-game").remove();
};

const match = () => {
    let matching = firstCard.getAttribute("data-name") === secondCard.getAttribute("data-name");

    matching ? disableCards() : flipBackCards();
};

const disableCards = () => {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    if (!musicMute) {
        const audio = new Audio("./sound_effects/combo.wav");
        audio.play();
        audio.volume = 0.4;
    }

    updateScore((points += 5));

    matchedCards++;
};

const flipBackCards = () => {
    lock = true;

    if (!musicMute) {
        const audio = new Audio("./sound_effects/failed_combo.wav");
        audio.play();
        audio.volume = 0.4;
    } else {
    }

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        updateScore((points -= 1));

        resetingBoard();
    }, 850);
};

const resetingBoard = () => {
    flipped = false;
    lock = false;
    firstCard = false;
    secondCard = false;
};

function shuffle() {
    cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * cardsArray.length);
        card.style.order = randomPos;
    });
}

const music = document.getElementById("music");
const mutedButton = document.querySelector(".volume-control");

const muteToggle = () => {
    musicMute = !musicMute;

    if (musicMute) {
        music.muted = true;
        music.pause();
        mutedButton.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    } else {
        music.muted = false;
        music.play();
        mutedButton.innerHTML = `<i class="fa-solid fa-volume-low"></i>`;
    }
};

mutedButton.addEventListener("click", muteToggle);
