// Function to generate a random number within a specified range
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to check the user's guess against the random number
function checkGuess(randomNumber, guess) {
  if (guess === randomNumber) {
    return "equal";
  } else if (guess < randomNumber) {
    return "lower";
  } else {
    return "higher";
  }
}

// Example usage
const minRange = 1;
const maxRange = 100;
let randomNumber = generateRandomNumber(minRange, maxRange);
let attempts = 0;
let leaderboard = []; // Array to store leaderboard data
let username = ""; // Variable to store the username
let password = ""; // Variable to store the password

// Function to handle user input and check the guess
function handleGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);

  if (isNaN(guess)) {
    alert("Invalid input! Please enter a valid number.");
    return;
  }

  attempts++;

  const result = checkGuess(randomNumber, guess);

  if (result === "equal") {
    alert(`Congratulations, ${username}! You guessed the number ${randomNumber} in ${attempts} attempts.`);

    // Reset the game
    attempts = 0;
    randomNumber = generateRandomNumber(minRange, maxRange);
    document.getElementById("guessInput").value = "";
  } else {
    alert(`Your guess is ${result}. Try again!`);
  }
}

// Function to handle the username input
function handleUsernameInput() {
  username = document.getElementById("usernameInput").value;
}

// Function to handle the password input
function handlePasswordInput() {
  password = document.getElementById("passwordInput").value;
}

// Function to handle the login button click
function handleLogin() {
  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  alert(`Logged in as ${username}`);
  clearInputs();
}

// Function to handle the signup button click
function handleSignup() {
  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  alert(`Signed up with username ${username}`);
  clearInputs();
}

// Function to clear the input fields
function clearInputs() {
  document.getElementById("usernameInput").value = "";
  document.getElementById("passwordInput").value = "";
}

// Function to handle the Enter key press
function handleKeyPress(event) {
  if (event.key === "Enter") {
    if (document.activeElement === document.getElementById("guessInput")) {
      handleGuess();
    } else if (document.activeElement === document.getElementById("usernameInput")) {
      handleSignup();
    } else if (document.activeElement === document.getElementById("passwordInput")) {
      handleSignup();
    }
  }
}
