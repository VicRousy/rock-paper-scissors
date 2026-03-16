// Rock-Paper-Scissors (5 rounds)
// -----------------------------
// Keeps score across 5 rounds so the user can see who wins the match.
// It runs in the browser console and offers an option to replay without
// reloading the page.

// Returns a random move for the computer so the game feels unpredictable.
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Collects the player's move and ensures the game can progress.
// Keeps asking until a valid choice is provided.
function getHumanChoice() {
  const choices = ["rock", "paper", "scissors"];

  while (true) {
    const input = prompt("Enter rock, paper, or scissors:").trim().toLowerCase();
    if (choices.includes(input)) return input;

    // Prevents invalid input from breaking the game flow.
    alert("Please enter rock, paper, or scissors.");
  }
}

// Manages a full match of 5 rounds and tracks overall score.
function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  // Makes output messages easier to read when displayed in the console.
  const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

  // Determines the winner of one round and provides a message to display.
  function playRound(humanChoice, computerChoice) {
    const human = humanChoice.trim().toLowerCase();
    const computer = computerChoice.trim().toLowerCase();

    if (human === computer) {
      return {
        winner: "tie",
        message: `It's a tie! You both chose ${capitalize(human)}.`,
      };
    }

    const winningPairs = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper",
    };

    const humanWins = winningPairs[human] === computer;
    const winnerChoice = humanWins ? human : computer;
    const loserChoice = humanWins ? computer : human;

    return {
      winner: humanWins ? "human" : "computer",
      message: `${humanWins ? "You win" : "You lose"}! ${capitalize(winnerChoice)} beats ${capitalize(loserChoice)}.`,
    };
  }

  // Run a fixed number of rounds to give the user a complete match.
  for (let round = 1; round <= 5; round += 1) {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    const { winner, message } = playRound(humanChoice, computerChoice);

    console.log(`Round ${round}: ${message}`);

    if (winner === "human") {
      humanScore += 1;
    } else if (winner === "computer") {
      computerScore += 1;
    }

    console.log(`Score: You ${humanScore} - Computer ${computerScore}`);
  }

  // Declare the overall game winner.
  if (humanScore > computerScore) {
    console.log("Game over: You win the game!");
  } else if (computerScore > humanScore) {
    console.log("Game over: Computer wins the game!");
  } else {
    console.log("Game over: It's a tie!");
  }
}

// Allow the player to restart the match without reloading the page.
do {
  playGame();
} while (confirm("Play again?"));