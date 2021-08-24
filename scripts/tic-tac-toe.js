
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

  function storeValue(cell){
    const cellID = cell.target.getAttribute('id');
    const cellIndex = cellID.slice(5);

    if(gameBoard.state[cellIndex]){
      return;
    }

    //filtering for cells that were actually filled
    filledCells = gameBoard.state.filter(cell => cell);

    //deciding turn based on how many cells were actually filled
    if(filledCells.length % 2 === 0){
      gameBoard.state[cellIndex] = 'x';
    } else{
      gameBoard.state[cellIndex] = 'o';
    }

  }

  function checkWinner(){

  }

  return {startGame, storeValue, checkWinner};
})();

let displayController = (function(){

  function displayBoard(){

    const wrapper = document.querySelector('#wrapper');
    const board = document.createElement('div');

    //inserting the board
    console.log(wrapper.lastChild);
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

  function updateBoard(cell){

  }

  function makeInteractive(){
    const boardCells = document.querySelectorAll('.board-cell');

    boardCells.forEach(cell => cell.addEventListener('click',
      (e) => {
        gameFlow.storeValue(e);
        displayController.updateBoard(e);
      }));
  }

  function endMatch(){

  }

  function removeBoard(){

  }

  function displayForm(){

  }

  function displayWinner(){

  }

  return {displayBoard, updateBoard, makeInteractive, endMatch};
})();

//Player Factory Function

function Player(){
  let name = '';
  let sign = '';
  return {name, sign}
}

gameFlow.startGame();
