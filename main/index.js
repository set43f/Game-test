const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const best = document.querySelector('.best');
const last = document.querySelector('.last');

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

let lastHole;
let timeUp = false;
let scrole = 0;
best.textContent = localStorage.getItem('bestScore');
let bestScore = 0;
last.textContent = localStorage.getItem('lastScore');
let lastScore = 0;

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole)  {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
        else {
            lastScore = score
            console.log(lastScore)
            localStorage.setItem('lastScore',lastScore);
            last.textContent = localStorage.getItem('lastScore')
            if (lastScore>bestScore) {
                bestScore = lastScore
                localStorage.setItem('bestScore', bestScore);
                best.textContent = localStorage.getItem('bestScore');
            }
        }   
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
}

function bonk(e) {
    if (!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));