// Random meme image loader for page refresh
// This uses all image names following the pattern meme01.jpg, meme02.jpg ... memeXXX.jpg
// and assumes they exist in ./images folder.
const totalMemes = 709; // set to highest meme number available

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
}

window.addEventListener('DOMContentLoaded', setRandomMeme);


// Make h1 clickable to load a new meme
document.querySelector('h1').addEventListener('click', setRandomMeme);

