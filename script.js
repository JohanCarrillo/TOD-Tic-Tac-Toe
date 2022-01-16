// ------------------------- FUNCTION FACTORIES ------------------------------
function createPlayer(name, symbol) {
	// used to create player objects

	const _name = name;
	const _symbol = symbol;
	let numberOfMovements = 0;
	
	const getName = () => _name;
	const getSymbol = () => _symbol;

	return {getName, getSymbol, numberOfMovements};
}

function createComputer(name, symbol) {
	// extends createPlayer to make the computer play by itself

	// inherate from createPlayer
	const father = createPlayer(name, symbol);

	// function to make a play
	const play = (board) => {
		const choose = Math.floor(Math.random() * 9);
		board[choose].click();
		console.log('computer click: ' + choose);
	}

	return Object.assign({}, {play}, father);
}

function gameBoardFunc() {
	// this function creates an object that contains all the functions related to the game board

	function checkWinner(board) {  // input is array of cell nodes
		// check if there is a winner, if there is return true, otherwise false

		if (
			(board[0].textContent === board[1].textContent && board[1].textContent === board[2].textContent && board[0].textContent !== '') ||  // first row
			(board[3].textContent === board[4].textContent && board[4].textContent === board[5].textContent && board[3].textContent !== '') ||  // second row
			(board[6].textContent === board[7].textContent && board[7].textContent === board[8].textContent && board[6].textContent !== '') ||  // third row
			(board[0].textContent === board[3].textContent && board[3].textContent === board[6].textContent && board[0].textContent !== '') ||  // first column
			(board[1].textContent === board[4].textContent && board[4].textContent === board[7].textContent && board[1].textContent !== '') ||  // second column
			(board[2].textContent === board[5].textContent && board[5].textContent === board[8].textContent && board[2].textContent !== '') ||  // third column
			(board[0].textContent === board[4].textContent && board[4].textContent === board[8].textContent && board[0].textContent !== '') ||  // diagonal left
			(board[2].textContent === board[4].textContent && board[4].textContent === board[6].textContent && board[2].textContent !== '')		 // diagonal right
		) {
			return true;
		} else {
			return false;
		}
	}


	function writeOnBoard(cell, player) {  // input is cell node and current player
		/* this function writes on the board the current player symbol if the selected
			cell is not occuped yet, mark every used cell with a new class named "used". 
			returns true if the cell was changed, otherwise false, this is used to end 
			current player's turn. */

		if (cell.textContent === '') {  // if cell is empty can write
			cell.textContent = player.getSymbol();
			return true;
		} else {
			return false;
		}
	}

	return {checkWinner, writeOnBoard}
}

function startGame() {
	// used to initialize the players

	let player = createPlayer('Player', 'O');
	let computer = createComputer('Computer', 'X');
	
	return [player, computer];
}

function reset(board, players) {
	// clear the game board and the movements history

	// clear board content
	for (let element of board) {
		element.textContent = '';
	}

	// clear movements history
	players[0].numberOfMovements = 0;
	players[1].numberOfMovements = 0;

	// show board
	document.querySelector('#game-board').style.display = 'block';
	document.querySelector('h3').style.display = 'block';
	document.querySelector('#messages').style.display = 'block';
	document.querySelector('#message-winner').style.display = 'none';
	document.querySelector('button').style.display = 'none';
}

// ------------------------- GAME EXECUTION ------------------------------
(() => {
	// initializations
	const board = document.querySelectorAll('.cell');  // charge all cells
	const players = startGame();  // create players
	const gameBoard = gameBoardFunc();  // instance game board
	const messages = document.querySelector('#messages');  // used to show who's turn is
	const messageWinner = document.querySelector('#message-winner');  // used to show the result of the match
	const resetButton = document.querySelector('button');
	resetButton.addEventListener('click', () => {reset(board, players)});
	
	// select randomly first turn
	let counter = Math.floor(Math.random() * 2);
	let currentPlayer = players[counter];
	messages.textContent = `${currentPlayer.getName()}' turn`;
	// make the computer play by itself if it starts
	if (currentPlayer.getName() === players[1].getName()) {
		setTimeout(function() {  // add 0.3 seconds delay
			currentPlayer.play(board);
		}, 300)
	}
	
	// add functionality to board cells 
	board.forEach(element => element.addEventListener('click', () => {

		// if element was valid, write and end turn
		if (gameBoard.writeOnBoard(element, currentPlayer)) {  // write on element
			currentPlayer.numberOfMovements++;

			// check for winner
			if (gameBoard.checkWinner(board)) {
				// hide board
				document.querySelector('#game-board').style.display = 'none';
				document.querySelector('h3').style.display = 'none';
				messages.style.display = 'none';
				// announce winner
				messageWinner.textContent = `${currentPlayer.getName()} is the winner!`;
				messageWinner.style.display = 'block';
				// show reset button
				resetButton.style.display = 'block';
				// select who starts now
				counter = Math.floor(Math.random() * 2);  // reset counter
				currentPlayer = players[counter];
				messages.textContent = `${currentPlayer.getName()}' turn`;
				// if computer play first
				if (currentPlayer.getName() === players[1].getName()) {  // make the computer play by itself
					setTimeout( () => {  // add 0.3 seconds delay
						console.log('computer choice');
						currentPlayer.play(board);
					}, 300);
				}
				
			} else if (players[0].numberOfMovements + players[1].numberOfMovements === 9) {  // board full
				
				// hide board
				document.querySelector('#game-board').style.display = 'none';
				document.querySelector('h3').style.display = 'none';
				messages.style.display = 'none';
				// announce winner
				messageWinner.textContent = 'It\'s a draw!';
				messageWinner.style.display = 'block';
				// show reset button
				resetButton.style.display = 'block';
				// select who starts now
				counter = Math.floor(Math.random() * 2);  // reset counter
				currentPlayer = players[counter];
				messages.textContent = `${currentPlayer.getName()}' turn`;
				// ifcomputer play first
				if (currentPlayer.getName() === players[1].getName()) {  // make the computer play by itself
					setTimeout( () => {  // add 0.3 seconds delay
						console.log('computer choice');
						currentPlayer.play(board);
					}, 300);
				}

			} else {  // no end game, just change turn

				// change turn
				counter++;
				currentPlayer = players[counter % 2];  // change player
				messages.textContent = `${currentPlayer.getName()}' turn`;
				// when computer's turn
				if (currentPlayer.getName() === players[1].getName()) {  // make the computer play by itself
					setTimeout( () => {  // add 0.3 seconds delay
						console.log('computer choice');
						currentPlayer.play(board);
					}, 300);
				}
			}
		} else if (currentPlayer.getName() === players[1].getName()) { // if computer movement was not valid repeat
			setTimeout( () => {  // add 0.3 seconds delay
				console.log('computer choice');
				currentPlayer.play(board);
			}, 300);
		}

	}))
	
})()