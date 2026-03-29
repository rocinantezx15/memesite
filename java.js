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

// handles back/forward button
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.meme) {
        loadMeme(e.state.meme);
    } else {
        setRandomMeme();
    }
});

window.addEventListener('DOMContentLoaded', setRandomMeme);
document.querySelector('h1').addEventListener('click', setRandomMeme);
