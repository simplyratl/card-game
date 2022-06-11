const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const chosenGame = parameters.get("name");

(function checkValidURL() {
    if (!chosenGame || (chosenGame !== "easy4x4" && chosenGame !== "medium6x6" && chosenGame !== "hard8x8"))
        window.location.href = "./difficulty.html";
})();

const memory_game = document.querySelector(".memory-game-wrapper");
let cards;

let flipped = false;
let firstCard, secondCard;
let lock = false;

let points = 0;
let highestScore = 0;

let matchedCards = 0;

const myCanvas = document.createElement("canvas");
document.body.appendChild(myCanvas);
let myConfetti = confetti.create(myCanvas, {
    resize: true,
    useWorker: true,
});
myConfetti({
    particleCount: 100,
    spread: 180,
});

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

const getGameType = (gameType) => {
    const games = {
        easy4x4: 16,
        medium6x6: 36,
        hard8x8: 64,
    };

    return games[gameType.toLowerCase()] ?? "game type not found";
};

const calculateRepeatCards = (gameType) => (getGameType(gameType) <= 36 ? 2 : 4);

function displayByDifficulty() {
    let counter = 0;

    memory_game.classList.add(chosenGame);

    for (let i = 0; i < cardsArray.length; i++) {
        for (j = 0; j < calculateRepeatCards(chosenGame); j++) {
            counter++;

            if (counter > getGameType(chosenGame)) break;

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

    cards = document.querySelectorAll(".memory-card");
    cards.forEach((card) => card.addEventListener("click", flipCard));

    timerEnd = false;

    timerCycle();

    shuffle();
}

displayByDifficulty();

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

        const MAX_CARDS_USED = getGameType(chosenGame) / 2;

        if (getGameType(chosenGame) && matchedCards >= MAX_CARDS_USED) {
            setTimeout(() => {
                alert(`Cestitamo. Osvojili ste ${points} poena.`);

                endGameDiv();

                setTimeout(() => {
                    document.getElementById("end-game").classList.add("active");
                }, 400);

                highestScore <= points && confetti();
            }, 600);
        }
    }
}

const endGameDiv = () => {
    timerEnd = true;

    if (!musicMute) {
        const audio = new Audio(
            highestScore <= points ? "./sound_effects/win.wav" : "./sound_effects/lose.wav"
        );
        audio.play();
        audio.volume = 0.4;
    }

    END_GAME_DIV();
};

const resetBoard = () => {
    memory_game.innerHTML = "";

    points = 0;
    resetUsedCards();
    matchedCards = 0;

    timerReset();

    displayByDifficulty();
    document.getElementById("end-game").remove();
};

const match = () => {
    let matching = firstCard.getAttribute("data-name") === secondCard.getAttribute("data-name");

    matching ? disableCards() : flipBackCards();
};

const updateScore = (updatedScore) => {
    document.getElementById("points").innerHTML = updatedScore;

    if (highestScore <= points) {
        highestScore = points;
        document.getElementById("highest-score").innerHTML = `Highest score: ${highestScore}`;
    }
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
    }

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        updateScore((points -= 1));

        resetUsedCards();
    }, 850);
};

const resetUsedCards = () => {
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
