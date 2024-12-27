// covert back the JSON object to JS object
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

//calling it display
updateResult();

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  // console.log(computerMove);
  let result = "";

  if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissor") {
      result = "You lose.";
    }
  } else if (playerMove === "scissor") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissor") {
      result = "Tie.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissor") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  //convert the score from JS object to JSON
  localStorage.setItem("score", JSON.stringify(score));

  //calling it to update the score
  updateScoreElement();

  //for updating the result in paragraph HTML to display
  document.querySelector(".js-result").innerHTML = result;

  //for updating the result in paragraph HTML to display
  document.querySelector(
    ".js-moves"
  ).innerHTML = `You<img src="${playerMove}-emoji.png" class="move-icon">
                    <img src="${computerMove}-emoji.png" class="move-icon">
                    Computer`;
}

//For updating score in Paragraph HTML to display
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber <= 1) {
    computerMove = "scissor";
  }

  return computerMove;
}
