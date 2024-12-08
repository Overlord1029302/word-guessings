const inputs = document.querySelector(".word"),
    hintTag = document.querySelector(".hint span"),
    guessLeft = document.querySelector(".guess span"),
    mistakes = document.querySelector(".wrong span"),
    resetBtn = document.querySelector(".reset"),
    hintBtn = document.querySelector(".showhint"),
    hintElement = document.querySelector(".hint"),
    typeInput = document.querySelector(".type-input");

// Intializing game variables
let word, incorrectLetters = [], correctLetters = [], maxGuesses;

// Select random word from word list and set up game
function startNewGame() {

    // Hide hint element
    hintElement.style.display = "none";
    hintElement.style.opacity = "0";

    // Choose random word from db and setup game
    const ranWord = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranWord.word;
    // If word chars >= 5 then max guess = 8 else max guess = 6
    maxGuesses = word.length >= 5 ? 8 : 6;
    incorrectLetters = [];
    correctLetters = [];
    hintTag.innerText = ranWord.hint;
    guessLeft.innerText = maxGuesses;
    mistakes.innerText = incorrectLetters;

    // Create input for each letter of word
    inputs.innerHTML = "";
    for (let i = 0; i < word.length; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.disabled = true;
        inputs.appendChild(input);
    }
}

// Handle user input and update game stats
function handleInput(e) {
    const key = e.target.value.toLowerCase();
    if (key.match(/^[a-z]+$/i) && !incorrectLetters.includes(key) && !correctLetters.includes(key)) {
        // Check if the letter is in the word
        if (word.includes(key)) {
            // Update correct guesses
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
            correctLetters.push(key);
        } else {
            // Update incorrect guesses
            maxGuesses--;
            incorrectLetters.push(key);
            mistakes.innerText = incorrectLetters.join(", ");
        }
    }

    // Update remaining guesses
    guessLeft.innerText = maxGuesses;

    // Check for win condition
    let guessedWord = Array.from(inputs.querySelectorAll("input"))
        .map(input => input.value)
        .join("");

    if (guessedWord === word) {
        setTimeout(() => {
            alert(`Congrats! You Found The Word ${word.toUpperCase()}`);
            startNewGame();
        }, 100); // Small delay to ensure the last letter displays
    } else if (maxGuesses < 1) {
        alert("Game Over! You Don't Have Remaining Guesses!");
        for (let i = 0; i < word.length; i++) {
            inputs.querySelectorAll("input")[i].value = word[i];
        }
    }

    // Clear input field
    typeInput.value = "";
}

// Show hint element
function showHintElement() {
    hintElement.style.display = "block";
    hintElement.style.opacity = "1";
}

// Setup event listeners
resetBtn.addEventListener("click", startNewGame);
hintBtn.addEventListener("click", showHintElement);
typeInput.addEventListener("input", handleInput);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());

startNewGame();