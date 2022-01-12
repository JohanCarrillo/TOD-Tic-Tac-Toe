function createPlayer(name, symbol) {
	const _name = name;
	const _symbol = symbol;
	let numberOfMovements = 0;
	
	const getName = () => _name;
	const getSymbol = () => _symbol;


	return {getName, getSymbol, numberOfMovements};
}

function gameBoardFunc() {
	// this function creates an object that contains all the functions related to the game board

	function checkWinner(board) {  // input is array of cell nodes
		// check if there is a winner, if there is return true, otherwise false

		// need to add another condition first to check if the cells are used, because at this point all cells content are empty forhence are all equall and there is always a winner
		if (
			(board[0].textContent === board[1].textContent && board[1].textContent === board[2].textContent) ||  // first row
			(board[3].textContent === board[4].textContent && board[4].textContent === board[5].textContent) ||  // second row
			(board[6].textContent === board[7].textContent && board[7].textContent === board[8].textContent) ||  // third row
			(board[0].textContent === board[3].textContent && board[3].textContent === board[6].textContent) ||  // first column
			(board[1].textContent === board[4].textContent && board[4].textContent === board[7].textContent) ||  // second column
			(board[2].textContent === board[5].textContent && board[5].textContent === board[8].textContent) ||  // third column
			(board[0].textContent === board[4].textContent && board[4].textContent === board[8].textContent) ||  // diagonal left
			(board[2].textContent === board[4].textContent && board[4].textContent === board[6].textContent)		 // diagonal right
		) {
			return true;
		} else {
			return false;
		}
	}


	function writeOnBoard(cell, player) {  // input is cell node and current player
		/* this function writes on the board the current player symbol if the selected
			cell is not occuped yet, mark every used cell with a new class named "used". 
			return true if the cell was changed, otherwise false, this is used to end 
			current player's turn. */
		if (!cell.classList.contains('used')) {  // if cell is empty can write
			cell.textContent = player.getSymbol();
			cell.classList.add('used');  // every used has this class
			return true;
		} else {
			return false;
		}
	}

	return {checkWinner, writeOnBoard}
}

function startGame() {
	let player = createPlayer('Player', 'X');
	let computer = createPlayer('Computer', 'O');
	
	return [player, computer];
};

(() => {
	
	const players = startGame();  // create players
	const gameBoard = gameBoardFunc();  // instance game board
	// select randomly first turn
	let counter = Math.floor(Math.random() * 2);
	let currentPlayer = players[counter];
	const messages = document.querySelector('#messages');
	const board = document.querySelectorAll('.cell');
	// add functionality to the board
	board.forEach(element => element.addEventListener('click', () => {

		// if element was valid, write and end turn
		if (gameBoard.writeOnBoard(element, currentPlayer)) {  // write on element
			currentPlayer.numberOfMovements++;
			// check for winner
			if (gameBoard.checkWinner(board)) {
				// announce winner
				messages.textContent = `${currentPlayer.getName()} is the winner!`;
				// end game
				// restart board?
				
			} else if (players[0].numberOfMovements + players[1].numberOfMovements === 9) {  // board full
				// announce draw
				// end game
				// restard board?
			}
			// change turn
			counter++;
			currentPlayer = players[counter % 2]
			console.log(currentPlayer.getName());
		}

	}))
	
})()