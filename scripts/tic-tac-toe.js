
//Modules

let gameBoard = (function(){
  let state = [];
  return {state};
})();

let gameFlow = (function(){

  function startGame(){
    displayController.displayBoard();
    displayController.makeInteractive();
  }

  let winningCombination = [];

  function checkWinner(){

    //horizontal lines
    for(let i = 0; i < 9; i = i + 3){
      if(gameBoard.state[i]){
        if(gameBoard.state[i] === gameBoard.state[i + 1] &&
          gameBoard.state[i] === gameBoard.state[i + 2]){
            gameFlow.winningCombination = [i, i + 1, i + 2];
        }
      }
    }

    //vertical lines
    for(let i = 0; i < 3; i++){
     if(gameBoard.state[i]){
       if(gameBoard.state[i] === gameBoard.state[i + 3] &&
         gameBoard.state[i] === gameBoard.state[i + 6]){
           gameFlow.winningCombination = [i, i + 3, i + 6];
       }
     }
   }

    //diagnol rewritten
    for(let i = 0; i <= 2; i = i + 2){
      if(gameBoard.state[0 + i]){
        if(gameBoard.state[0 + i] === gameBoard.state[4] &&
             gameBoard.state[0 + i] === gameBoard.state[8 - i]){
          gameFlow.winningCombination = [0 + i, 4, 8 - i];
        }
      }
    }
  }

  return {startGame, checkWinner, winningCombination};
})();

let displayController = (function(){

  function displayBoard(){

    const wrapper = document.querySelector('#wrapper');
    const board = document.createElement('div');

    //inserting the board
    wrapper.insertBefore(board, document.querySelector('#restart-button'));
    board.setAttribute('id','board');

    //creating cells within the board
    for(let i = 0; i < 9; i++){
      const boardCell = document.createElement('div');
      boardCell.classList.add('board-cell');
      boardCell.setAttribute('id', `cell-${i}`);

      board.appendChild(boardCell);
      if(i === 0 || i === 3 || i === 6){
        boardCell.style.borderLeft = 'none';
      }
      if(i === 6 || i === 7 || i === 8){
        boardCell.style.borderBottom = 'none';
      }
    }
  }

  function makeInteractive(){
    const boardCells = document.querySelectorAll('.board-cell');

    boardCells.forEach(cell => cell.addEventListener('click',
        _handleClickEvent));
  }

  function _handleClickEvent(e){
    const cellID = e.target.getAttribute('id');
    const cellIndex = cellID.slice(5);

    if(gameBoard.state[cellIndex]){
      return;
    }

    //deciding turn based on how many cells were actually filled
    let filledCells = gameBoard.state.filter(cell => cell);
    let cellValue = filledCells.length % 2 === 0 ? 'X' : 'O';

    //updating the array and the display
    gameBoard.state[cellIndex] = cellValue;
    e.target.textContent = cellValue;

    gameFlow.checkWinner();
  }

  function endMatch(){

  }

  function _removeBoard(){

  }

  function _displayForm(){

  }

  function _displayWinner(){

  }

  return {displayBoard, makeInteractive, endMatch};
})();

//Player Factory Function

function Player(){
  let name = '';
  let sign = '';
  return {name, sign}
}

gameFlow.startGame();
