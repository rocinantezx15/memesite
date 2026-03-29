const totalMemes = 709;

function getRandomMemeFilename() {
    const n = Math.floor(Math.random() * totalMemes) + 1;
    return n < 10 ? `meme0${n}.jpg` : `meme${n}.jpg`;
}

function setRandomMeme() {
    const imgEl = document.querySelector('.meme img');
    if (!imgEl) return;
    const randomImage = getRandomMemeFilename();
    imgEl.src = `./images/${randomImage}`;
    imgEl.alt = `Meme ${randomImage}`;

    // push this meme into browser history
    history.pushState({ meme: randomImage }, '', `?meme=${randomImage}`);
}

function loadMeme(filename) {
    const imgEl = document.querySelector('.meme img');
    if (!imgEl) return;
    imgEl.src = `./images/${filename}`;
    imgEl.alt = `Meme ${filename}`;
}
function playBellSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(528, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 2);
    gainNode.gain.setValueAtTime(0.8, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.5);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 2.5);
}
// handles back/forward button
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.meme) {
        loadMeme(e.state.meme);
    } else {
        setRandomMeme();
    }
});

window.addEventListener('DOMContentLoaded', setRandomMeme);
document.querySelector('h1').addEventListener('click', () => {
    playBellSound();
    setRandomMeme();
});

