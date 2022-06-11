const timer = document.getElementById("timer");
let hr = 0;
let min = 0;
let sec = 0;
const SECOND_REAL_TIME = 1000;

let timerEnd = false;

const timerCycle = () => {
    sec = parseInt(sec);
    min = parseInt(min);

    sec = sec + 1;

    if (sec == 60) {
        min = min + 1;
        sec = 0;
    }
    if (min == 60) {
        hr = hr + 1;
        min = 0;
        sec = 0;
    }

    if (sec < 10 || sec == 0) {
        sec = "0" + sec;
    }
    if (min < 10 || min == 0) {
        min = "0" + min;
    }

    timer.innerHTML = min + ":" + sec;

    if (!timerEnd) {
        setTimeout(timerCycle, SECOND_REAL_TIME);
    }
};

// timerCycle();

function timerReset() {
    hr = 0;
    min = 0;
    sec = 0;
}
