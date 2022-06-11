const music = document.getElementById("music");
const mutedButton = document.querySelector(".volume-control");

let btns;

(function loadPermissionQuestion() {
    const CHECK_ALREADY_CLICKED = sessionStorage.getItem("music");

    if (CHECK_ALREADY_CLICKED) return;

    document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div class="get-permission-music-container">
            <div class="get-permission-music">
                <p class="question">Do you want music while playing?</p>

                <div class="btns">
                    <button class="btn" id="btn-music">YES</button>
                    <button class="btn" id="btn-music">NO</button>
                </div>
            </div>
        </div>
    `
    );

    btns = document.querySelectorAll("#btn-music");
})();

const getPermissionMusic = (e) => {
    const container = document.querySelector(".get-permission-music-container");

    const SELECTED_OPTION = e.target.innerHTML;

    if (SELECTED_OPTION === "NO") muteToggle();

    if (SELECTED_OPTION === "YES") {
        music.muted = false;
        music.play();
    }

    container.remove();
    sessionStorage.setItem("music", SELECTED_OPTION.toLowerCase());
};

btns.forEach((btn) => {
    btn.addEventListener("click", getPermissionMusic);
});

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
