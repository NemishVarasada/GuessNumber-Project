let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

// Restrict input to numbers between 1 and 100
userInput.addEventListener('input', () => {
    const value = userInput.value;
    if (value < 1 || value > 100 || isNaN(value)) {
        userInput.setCustomValidity("Enter a number between 1 and 100!");
    } else {
        userInput.setCustomValidity(""); // Valid input
    }
});

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a number greater than 1');
    } else if (guess > 100) {
        alert('Please enter a number less than 100');
    } else {
        prevGuess.push(guess);
        if (numGuess === 11) {
            displayGuess(guess);
            displayMessage(`Game Over. The random number was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`🎉 Congratulations! You guessed it right.`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`📉 Too low! Try a higher number.`);
    } else if (guess > randomNumber) {
        displayMessage(`📈 Too high! Try a lower number.`);
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}



function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function () {
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = '10';
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    });
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');

    // Create a new button dynamically
    const newGameButton = document.createElement('button');
    newGameButton.id = 'newGame';
    newGameButton.textContent = 'Start New Game';

    // Directly assign inline styles for the button
    newGameButton.style.padding = '12px';
    newGameButton.style.margin = '12px';
    newGameButton.style.fontSize = '15px';
    newGameButton.style.borderRadius = '8px';
    newGameButton.style.color = 'white';
    newGameButton.style.backgroundColor = 'crimson';
    newGameButton.style.border = 'none';

    // Append the button to the resultParas container
    startOver.appendChild(newGameButton);
    playGame = false;

    // Add event listener for starting a new game
    newGameButton.addEventListener('click', newGame);
}
