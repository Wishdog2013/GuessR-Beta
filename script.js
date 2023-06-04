// HTML elements
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const resultText = document.getElementById('result-text');
const leaderboardList = document.getElementById('leaderboard-list');

// Event listener for submit button
submitButton.addEventListener('click', submitGuess);

// Submit guess function
function submitGuess() {
  const guess = parseInt(guessInput.value);

  // Validate the guess
  if (isNaN(guess) || guess < 1 || guess > 100) {
    resultText.textContent = 'Please enter a valid number between 1 and 100.';
    return;
  }

  // Compare the guess with the random number
  if (guess === randomNumber) {
    resultText.textContent = 'Congratulations! You guessed the correct number!';
    updateLeaderboard();
    resetGame();
  } else if (guess < randomNumber) {
    resultText.textContent = 'Too low! Try again.';
  } else {
    resultText.textContent = 'Too high! Try again.';
  }
}

// Update leaderboard function
function updateLeaderboard() {
  const username = document.getElementById('username-input').value;
  const guesses = Number(localStorage.getItem('guesses')) || 0;

  // Update the leaderboard in Airtable
  fetch('https://airtable.com/appJ9GuAu8wykoIJr?ao=aG9tZXNjcmVlbldvcmtzcGFjZQ', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.LAT}`
    },
    body: JSON.stringify({
      records: [
        {
          fields: {
            Username: username,
            Guesses: guesses
          }
        }
      ]
    })
  })
    .then(response => response.json())
    .then(data => console.log('Leaderboard updated:', data))
    .catch(error => console.error('Error updating leaderboard:', error));
}

// Reset game function
function resetGame() {
  // Generate a new random number
  randomNumber = Math.floor(Math.random() * 100) + 1;

  // Clear the input and result text
  guessInput.value = '';
  resultText.textContent = '';
}

// Initialize the game
let randomNumber = Math.floor(Math.random() * 100) + 1;
resetGame();
