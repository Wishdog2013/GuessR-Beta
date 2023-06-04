// HTML elements
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const leaderboardList = document.getElementById('leaderboard-list');
const usernameInput = document.getElementById('username');

// Submit guess function
function submitGuess() {
  const guess = parseInt(guessInput.value);

  // Validate the guess
  if (isNaN(guess) || guess < 1 || guess > 100) {
    alert('Please enter a valid number between 1 and 100.');
    return;
  }

  // Compare the guess with the random number
  if (guess === randomNumber) {
    alert('Congratulations! You guessed the correct number!');
    updateLeaderboard();
    resetGame();
  } else if (guess < randomNumber) {
    alert('Too low! Try again.');
  } else {
    alert('Too high! Try again.');
  }
}

// Update leaderboard function
function updateLeaderboard() {
  const guesses = parseInt(localStorage.getItem('guesses')) || 0;
  const username = usernameInput.value || 'Player';

  // Retrieve leaderboard data from storage or initialize an empty array
  const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];

  // Add the current user and their guesses to the leaderboard data
  leaderboardData.push({ username, guesses });

  // Sort the leaderboard data based on the number of guesses in ascending order
  leaderboardData.sort((a, b) => a.guesses - b.guesses);

  // Update the leaderboard HTML
  leaderboardList.innerHTML = '';
  leaderboardData.forEach((entry, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${entry.username} - ${entry.guesses} guesses`;
    leaderboardList.appendChild(listItem);
  });

  // Store the updated leaderboard data in local storage
  localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
}

// Reset the game function
function resetGame() {
  randomNumber = generateRandomNumber();
  guessInput.value = '';
}

// Generate random number between 1 and 100
function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Initialize the game
let randomNumber = generateRandomNumber();

// Event listener for submit button click
submitButton.addEventListener('click', submitGuess);
