// Rock-Paper-Scissors (UI version)
// -----------------------------
// The player clicks buttons (rock/paper/scissors) instead of typing prompts.
// The game keeps score, shows round-by-round results, and finishes once a
// player reaches 5 points.

// --- UI element references (DOM nodes) ---
const scoreEl = document.getElementById("score");
const resultsEl = document.getElementById("results");
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resetBtn = document.getElementById("reset");

// --- Game state ---
let humanScore = 0; // player score
let computerScore = 0; // computer score
let gameOver = false; // prevents playing after match ends

// Defines which choice beats which (used to decide winners).
const winningPairs = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

// Small helper to make messages look nicer.
const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

// Returns a random computer choice.
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Updates the score shown in the UI.
function updateScoreDisplay() {
  scoreEl.textContent = `Score: You ${humanScore} - Computer ${computerScore}`;
}

// Appends a result line to the results div.
function appendResultLine(text) {
  const line = document.createElement("p");
  line.textContent = text;
  resultsEl.append(line);
}

// Ends the game once someone reaches 5 points.
function setGameOver(winner) {
  gameOver = true;

  const finalMessage =
    winner === "human"
      ? "Game over: You win the game!"
      : winner === "computer"
      ? "Game over: Computer wins the game!"
      : "Game over: It's a tie!";

  appendResultLine(finalMessage);

  // Show reset button and disable the play buttons.
  resetBtn.hidden = false;
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;

  // Keep console logs for debugging (by course requirement for now).
  console.log(finalMessage);
}

// Plays a single round given the player's choice.
function playRound(humanChoice) {
  if (gameOver) return; // ignore clicks after the match ends

  const computerChoice = getComputerChoice();
  const human = humanChoice.trim().toLowerCase();
  const computer = computerChoice.trim().toLowerCase();

  if (human === computer) {
    const message = `It's a tie! You both chose ${capitalize(human)}.`;
    appendResultLine(message);
    console.log(message);
    return;
  }

  const humanWins = winningPairs[human] === computer;
  const winnerChoice = humanWins ? human : computer;
  const loserChoice = humanWins ? computer : human;

  const message = `${humanWins ? "You win" : "You lose"}! ${capitalize(winnerChoice)} beats ${capitalize(loserChoice)}.`;

  if (humanWins) {
    humanScore += 1;
  } else {
    computerScore += 1;
  }

  updateScoreDisplay();
  appendResultLine(message);
  console.log(message);
  console.log(`Score: You ${humanScore} - Computer ${computerScore}`);

  // If either player has 5 points, declare a winner.
  if (humanScore >= 5 || computerScore >= 5) {
    const winner = humanScore > computerScore ? "human" : "computer";
    setGameOver(winner);
  }
}

// Resets the match state so the user can play again.
function resetGame() {
  humanScore = 0;
  computerScore = 0;
  gameOver = false;

  // Clear the previously displayed results.
  resultsEl.innerHTML = "";

  // Hide reset button and re-enable play buttons.
  resetBtn.hidden = true;
  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorsBtn.disabled = false;

  updateScoreDisplay();
}

// Hook up the UI buttons to game logic.
rockBtn.addEventListener("click", () => playRound("rock"));
paperBtn.addEventListener("click", () => playRound("paper"));
scissorsBtn.addEventListener("click", () => playRound("scissors"));
resetBtn.addEventListener("click", resetGame);

// Initialize the UI on page load.
updateScoreDisplay();
appendResultLine("Click a button to start playing!");
