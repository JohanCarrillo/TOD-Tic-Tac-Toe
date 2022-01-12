const gameBoardFunc = () => {

	let canWrite = true;
	// charge the game board (every cell) and add functionality
	const board = document.querySelectorAll('cell');
	board.forEach(element => element.addEventListener('click', () => {
		canWrite = element.textContent === '' ? true : false;  // check if element is used
		console.log(canWrite);
	}))

	function writeOnBoard(cellId, player) {  // input is player and index of chosen cell
		// this function display and save the player move, if it's a valid movement return true, otherwise false
		const index = cellId.slice(4);
		const turnFinished = false;
		if (board[index].textContent === '') {
			board[index].textContent = player.getPlayerSymbol();  // display
			player.setMove(index);  // save in history
			turnFinished = true;  // if the movement was valid
		}
		return turnFinished;
	}

	function checkWinner() {
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

	return {createBoard, writeOnBoard, checkWinner, board, canWrite};
};

function createPlayer(name, symbol) {
	const _name = name;
	const _symbol = symbol;
	const _plays = [];
	
	const getPlayerName = () => _name;
	const getPlayerSymbol = () => _symbol;
	const setMove = index => _plays.push(index);
	const getNumberOfMovements = () => _plays.length;

	return {getPlayerName, getPlayerSymbol, setMove, getNumberOfMovements};
};

function startGame(gameBoard) {
	let player;
	let computer;
	document.querySelectorAll('.symbol').forEach(element => element.addEventListener('click', () => {

		// create players
		const playerName = document.querySelector('#player-name').value;
		const playerSymbol = element.textContent;
		player = createPlayer(playerName, playerSymbol);  // instance player
		const computerSymbol = playerSymbol === 'X' ? 'O' : 'X';
		computer = createPlayer('computer', computerSymbol);  // instance player
		
		// create game board
		document.querySelector('#header').style.display = 'none';  // hide menu
		gameBoard.createBoard();  // display board
	}));
	
	return [player, computer];
};

function endGame(gameBoard, players){
	if (players[0].getNumberOfMovements + players[1].getNumberOfMovements === 9){
		// end game, draw
		return true;
	} else if (gameBoard.checkWinner()){
		// end game, there's a winner
		return true;
	} else {
		// not finished yet
		return false;
	}
}

( () => {
	const gameBoard = gameBoardFunc();
	const players = startGame(gameBoard);  // create players and board
	let turnNumber = Math.floor(Math.random()*2);  // index of player who starts
	let turnPlayer = players[turnNumber];  // return player who starts playing
	console.log(players);
/* 
	// player make a movement
	document.querySelectorAll('.cell').forEach(element => element.addEventListener('click', () => {
		movementValidity = gameBoard.writeOnBoard(element.id, turnPlayer);
		
		// check if game ends
		if (endGame(gameBoard, players)) {
			// change display;
			return;
		}
		
		// change player if movement is valid
		if (writeOnBoard()) {
			document.querySelector('body').textContent = `${turnPlayer.getPlayerName()}'s\' turn`;
			turnPlayer = players[turnNumber++ % 2];
			console.log(turnPlayer.getPlayerName());
		} */
	}))


})()