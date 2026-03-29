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

    // Fundamental frequency for the bell (deep tone)
    const fundamentalFreq = 220; // Hz, can adjust for deeper/sharper sound

    // Create oscillators for fundamental and harmonics
    const oscillators = [];
    const gains = [];
    const harmonics = [1, 2, 3, 4.2, 5.4, 6.8]; // Harmonic series with slight inharmonicity
    const amplitudes = [1, 0.6, 0.4, 0.2, 0.1, 0.05]; // Decreasing amplitudes

    harmonics.forEach((harmonic, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamentalFreq * harmonic, audioCtx.currentTime);

        // Envelope: quick attack, slow decay
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(amplitudes[index] * 0.3, audioCtx.currentTime + 0.01); // Attack
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2); // Decay over 2 seconds

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        oscillators.push(osc);
        gains.push(gain);
    });

    // Start and stop all oscillators
    oscillators.forEach(osc => {
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 2);
    });
}

window.addEventListener('popstate', (e) => {
    if (e.state && e.state.meme) {
        loadMeme(e.state.meme);
    } else {
        setRandomMeme();
    }
});

window.addEventListener('DOMContentLoaded', setRandomMeme);

// single click listener with both bell and meme change
document.querySelector('h1').addEventListener('click', () => {
    playBellSound();
    setRandomMeme();
});
