const emojis = ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐸', '🐤', '🦅', '🦆', '🕊️',
                '🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐸', '🐤', '🦅', '🦆', '🕊️'];

const shuffled = emojis.sort(() => 0.5 - Math.random());

const gameboard = document.getElementById('gameboard');

// State Management
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Reset board state
function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Handle card click
function handleClick() {
    if (lockBoard || this.classList.contains('flipped')) return;

    this.innerText = this.dataset.emoji;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkMatch();
}

// Check if two cards match
function checkMatch() {
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        // Matched
        firstCard.removeEventListener('click', handleClick);
        secondCard.removeEventListener('click', handleClick);
        resetBoard();
    } else {
        // Not matched: flip back after delay
        setTimeout(() => {
            firstCard.innerText = '❓';
            secondCard.innerText = '❓';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 800);
    }
}

// Create game board
shuffled.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.innerText = '❓';
    card.addEventListener('click', handleClick);
    gameboard.appendChild(card);
});
