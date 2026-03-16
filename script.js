function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getHumanChoice() {
  const choices = ["rock", "paper", "scissors"];
  while (true) {
    const input = prompt("Enter rock, paper, or scissors:").trim().toLowerCase();
    if (choices.includes(input)) return input;
    alert("Please enter rock, paper, or scissors.");
  }
}

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

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
    const message = `${humanWins ? "You win" : "You lose"}! ${capitalize(winnerChoice)} beats ${capitalize(loserChoice)}.`;

    return {
      winner: humanWins ? "human" : "computer",
      message,
    };
  }

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

  if (humanScore > computerScore) {
    console.log("Game over: You win the game!");
  } else if (computerScore > humanScore) {
    console.log("Game over: Computer wins the game!");
  } else {
    console.log("Game over: It's a tie!");
  }
}

do {
  playGame();
} while (confirm("Play again?"));