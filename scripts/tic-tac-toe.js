//Player Factory Function
function Players(name){
  let score = 0;
  return {name, score};
}

let player1;
let player2;

//A module that contains the state, can create a board, and can update it
let gameBoard = (function(){
  let state = [];

  function createBoard(){

    //resetting state
    gameBoard.state = [];

    let wrapper = document.querySelector('#wrapper');
    let board = document.createElement('div');
    wrapper.appendChild(board);
    board.setAttribute('id','board');

    //creating cells within the board
    for(let i = 0; i < 9; i++){
      let boardCell = document.createElement('div');
      boardCell.classList.add('board-cell');
      boardCell.setAttribute('id', `cell-${i}`);

      board.appendChild(boardCell);
      if(i === 0 || i === 3 || i === 6){
        boardCell.style.borderLeft = 'none';
      }
      if(i === 6 || i === 7 || i === 8){
        boardCell.style.borderBottom = 'none';
      }

      boardCell.addEventListener('click', _updateBoard);
    }
  }


  function _updateBoard(e){

    if(e.target.textContent || gameFlow.gameOver){
      return;
    }

    cellID = e.target.getAttribute('id');
    cellIndex = cellID.slice(5);

    //deciding turn based on how many cells were actually filled
    if(gameBoard.state.filter(cell => cell).length % 2 === 0){
      gameBoard.state[cellIndex] = 'x';
      e.target.textContent = 'X';
    } else{
      gameBoard.state[cellIndex] = 'o';
      e.target.textContent = 'O';
    }

    gameFlow.checkWinner(gameBoard.state);

  }

  return{state, createBoard};
})();

//working on gameFlow module
let gameFlow = (function(){

  let gameOver;

  function checkWinner(boardState){

    //horizontal lines
    for(let i = 0; i < 9; i = i + 3){
      if(boardState[i]){
        if(boardState[i] === boardState[i + 1] &&
          boardState[i] === boardState[i + 2]){
            _stopGame(i, i+1, i+2);
        }
      }
    }
    //vertical lines
    for(let i = 0; i < 3; i++){
      if(boardState[i]){
        if(boardState[i] === boardState[i+3] &&
          boardState[i] === boardState[i+6]){
            _stopGame(i, i+3, i+6);
        }
      }
    }
    //diagonal lines
    if(boardState[0]){
      if(boardState[0] === boardState[4] && boardState[0] === boardState[8]){
        _stopGame(0, 4, 8);
      }
    }else if(boardState[2]){
      if(boardState[2] === boardState[4] && boardState[2] === boardState[6]){
        _stopGame(2, 4, 6);
      }
    }
  }

  function _stopGame(...cellIndex){

    console.log('we have a winner');

    //coloring cells
    for(let i = 0; i < 3; i++){
      let cell = document.querySelector(`#cell-${cellIndex[i]}`);
      cell.style.color = 'red';
    }

    gameFlow.gameOver = true;

  }
  return {checkWinner, gameOver};

})();


//Starting screen
function startGame(){

  let twoPlayerButton = document.querySelector('#two-player-button');

  twoPlayerButton.addEventListener('click', initGame);

}

function initGame(e){
    player1 = Players(prompt('Enter the name of the first player'));
    player2 = Players(prompt('Enter the name of the second player'));

    if(document.querySelector('#board')){
      document.querySelector('#board').remove();
      gameFlow.gameOver = false;
    }
    gameBoard.createBoard();
}

startGame();
