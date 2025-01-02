// covert back the JSON object to JS object
let score = { 
    wins: 0,
    losses: 0,
    ties: 0
};

const savedScore = JSON.parse(localStorage.getItem('score'));
if (savedScore) {
	score = savedScore;
}

//calling it display
updateScoreElement();

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
	})
document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
	})
document.querySelector('.js-scissor-button')
  .addEventListener('click', () => {
    playGame('scissor');
	})

	//keydown like 'r' for rock, 'p' for paper and 's' for scissor
	document.body.addEventListener('keydown', (event) => {
		if(event.key === 'r') {
			playGame('rock');
		} else if (event.key === 'p'){
			playGame('paper');
		} else if (event.key === 's') {
			playGame('scissor');
		} else if (event.key === 'a') {
			autoPlay();
		} else if (event.key === 'Backspace') {
			// resetScore();
			ShowResetConfirmation();
		}
	});

function playGame(playerMove) {
const computerMove = pickComputerMove();

// console.log(computerMove);
let result = '';	

if (playerMove === 'paper') {
    if (computerMove === 'rock') {
        result = 'You win.';
    } else if (computerMove === 'paper') {
        result = 'Tie.';
    } else if (computerMove === 'scissor') {
        result = 'You lose.';
    }
    
} else if (playerMove === 'scissor') {
    if (computerMove === 'rock') {
        result = 'You lose.';
    } else if (computerMove === 'paper') {
        result = 'You win.';
    } else if (computerMove === 'scissor') {
         result = 'Tie.'
}

} else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
        result = 'Tie.';
    } else if (computerMove === 'paper') {
        result = 'You lose.';
    } else if (computerMove === 'scissor') {
        result = 'You win.';
    }
}

if (result === 'You win.') {
    score.wins += 1;
} else if (result === 'You lose.') {
    score.losses += 1;
} else if (result === 'Tie.') {
    score.ties += 1;
}

//convert the score from JS object to JSON
localStorage.setItem('score', JSON.stringify(score));

//calling it to update the score
updateScoreElement();

//for updating the result in paragraph HTML to display
document.querySelector('.js-result').innerHTML = result;

//for updating the result in paragraph HTML to display
document.querySelector('.js-moves').innerHTML = `You<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

//For updating score in Paragraph HTML to display
function updateScoreElement() {
document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
const randomNumber = Math.random();
let computerMove = '';	

if (randomNumber >=0 && randomNumber < 1/3) {
    computerMove = 'rock';
} else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
} else if (randomNumber >= 2/3 && randomNumber <= 1) {
    computerMove = 'scissor'
} 

return computerMove;
}

let isAutoPlaying = false;
let intervalID;

//adding eventlistner for autoplay
document.querySelector('.js-auto-play-button')
	.addEventListener('click', () => {
		autoPlay();
	});


function autoPlay () {
	 if (!isAutoPlaying) {
		intervalID = setInterval(() => {
			const playerMove = pickComputerMove();
			playGame(playerMove);
	 }, 1000);
	 isAutoPlaying = true;
	 document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';

	} else {
		clearInterval(intervalID);
		isAutoPlaying = false;
		document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
	}
}

//event listner for reset score
document.querySelector('.reset-score-button')
	.addEventListener('click', () => {
		ShowResetConfirmation();
	});

	function resetScore() {
		// this is also a good method
		// if(confirm('Are you sure you want to reset the score?')) {
			score.wins = 0;
			score.losses = 0;
			score.ties = 0;
			localStorage.removeItem('score');
			updateScoreElement();
		}
		
		function ShowResetConfirmation() {
			document.querySelector('.js-reset-confirmation')
					.innerHTML = `
					Are you sure you want to reset the score?
					<button class="js-reset-confirmation-yes reset-confirm-button">
						Yes
					</button>
					<button class="js-reset-confirmation-no reset-confirm-button">
						No
					</button>`;

					document.querySelector('.js-reset-confirmation-yes')
							.addEventListener('click', () => {
								resetScore();
								HideResetConfirmation();
							});
					document.querySelector('.js-reset-confirmation-no')
							.addEventListener('click', () => {
								HideResetConfirmation();
							});
		}

		function HideResetConfirmation() {
			document.querySelector('.js-reset-confirmation')
					.innerHTML = ''
		}
