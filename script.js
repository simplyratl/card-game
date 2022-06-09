const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const chosenGame = parameters.get('name');

let flipped = false;
let firstCard, secondCard;
let lock = false;

const cardsArray = [
    'watermelon',
    'strawberry',
    'cherry',
    'lemon',
    'orange',
    'seven',
    'big_win',
    'plum',
    'banana',
];

(function displayByDifficulty() {
    switch (chosenGame) {
        case 'easy4x4':
            for (let i = 0; i < 15; i++) {
                const randomPos = Math.floor(Math.random() * cardsArray.length);

                document.querySelector('.memory-game-wrapper').insertAdjacentHTML(
                    'beforeend',
                    `
            <div class="memory-card" data-name="${cardsArray[randomPos]}">
                 <img
                     class="front-face"
                     src="./images/${cardsArray[randomPos]}.png"
                     draggable="false"
                 />
                 <img class="back-face" src="./images/back_face.png" draggable="false" />
             </div>
         `
                );
            }
            break;
    }
})();

const cards = document.querySelectorAll('.memory-card');

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
    }
}

const match = () => {
    let matching = firstCard.getAttribute('data-name') === secondCard.getAttribute('data-name');

    matching ? disableCards() : flipBackCards();
};

const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
};

const flipBackCards = () => {
    lock = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

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
//    cards.forEach(card => {
//       let randomPos = Math.floor(Math.random() * 10);
//       card.style.order = randomPos;
//    });
// })();

cards.forEach((card) => card.addEventListener('click', flipCard));
