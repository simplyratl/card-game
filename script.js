const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const chosenGame = parameters.get('name');

let flipped = false;
let firstCard, secondCard;
let lock = false;

let points = 0;

let matchedCards = 0;

const cardsArray = [
    'watermelon',
    'strawberry',
    'cherry',
    'lemon',
    'orange',
    'seven',
    'big_win',
    'plum',
    'diamond',
    'money',
    'card',
    'grape',
    'slot',
    'crown',
    'clock',
    'laptop',
    'microphone',
    'ball',
];

(function displayByDifficulty() {
    const memory_game = document.querySelector('.memory-game-wrapper');

    switch (chosenGame) {
        case 'easy4x4':
            memory_game.classList.add('easy');

            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 2; j++) {
                    memory_game.insertAdjacentHTML(
                        'beforeend',
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

        case 'medium6x6':
            memory_game.classList.add('medium');

            for (let i = 0; i < cardsArray.length; i++) {
                for (let j = 0; j < 2; j++) {
                    memory_game.insertAdjacentHTML(
                        'beforeend',
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

        case 'hard8x8':
            memory_game.classList.add('hard');
            let counter = 0;

            for (let i = 0; i < cardsArray.length; i++) {
                for (let j = 0; j < 4; j++) {
                    counter++;

                    if (counter > 64) {
                        break;
                    }

                    memory_game.insertAdjacentHTML(
                        'beforeend',
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
})();

const cards = document.querySelectorAll('.memory-card');

const updateScore = (updatedScore) => {
    document.getElementById('points').innerHTML = updatedScore;
};

function flipCard() {
    if (lock) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!flipped) {
        flipped = true;
        firstCard = this;

        return;
    } else {
        flipped = false;
        secondCard = this;

        match();

        if (chosenGame === 'easy4x4' && matchedCards >= 8) {
            setTimeout(() => {
                sessionStorage.setItem('high-score', points);
                alert(`Cestitamo. Osvojili ste ${points} poena.`);
                window.location.href = '/difficulty.html';
            }, 600);
        }
    }
}

const match = () => {
    let matching = firstCard.getAttribute('data-name') === secondCard.getAttribute('data-name');

    matching ? disableCards() : flipBackCards();
};

const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    updateScore((points += 5));
    matchedCards++;
};

const flipBackCards = () => {
    lock = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

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

// (function shuffle() {
//     cards.forEach((card) => {
//         let randomPos = Math.floor(Math.random() * 10);
//         card.style.order = randomPos;
//     });
// })();

cards.forEach((card) => card.addEventListener('click', flipCard));
