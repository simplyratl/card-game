const difficulties = document.querySelectorAll('.btn');

document.getElementById('high-score').innerHTML = `Highest score ${
    sessionStorage.getItem('high-score') ? sessionStorage.getItem('high-score') : 0
}.`;

let currentActive;

function chooseDifficulty() {
    if (currentActive) {
        removeActive();
        currentActive = this;
        currentActive.classList.toggle('active');
    } else {
        currentActive = this;
        currentActive.classList.toggle('active');
    }
}

const removeActive = () => {
    currentActive.classList.remove('active');
    currentActive = null;
};

difficulties.forEach((btn) => {
    btn.addEventListener('click', chooseDifficulty);
});

const submit = () => {
    if (currentActive) {
        let game = currentActive.innerHTML.replace(' ', '').toLowerCase();

        window.location.href = `/index.html?name=${game}`;
        return;
    } else {
        setTimeout(() => {
            document.getElementById('error').innerHTML = '';
            return;
        }, 2000);

        document.getElementById('error').innerHTML = 'Morate izabrati tezinu igre.';
    }
};

//APPEARENCE

const rippleButton = document.querySelector('.btn-start');

const mousePositionCustomProp = (e, element) => {
    let posX = e.offsetX;
    let posY = e.offsetY;

    element.style.setProperty('--x', posX + 'px');
    element.style.setProperty('--y', posY + 'px');
};

rippleButton.addEventListener('mousemove', (e) => {
    mousePositionCustomProp(e, rippleButton);
});
