const END_GAME_DIV = () => {
    return document.body.insertAdjacentHTML(
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
