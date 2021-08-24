
//Modules

let gameBoard = (function(){
  let state = [];
  return {state};
})();

let gameFlow = (function(){
  function startGame(){

  }

  function storeValue(){

  }

  function checkWinner(){

  }

  return {startGame, storeValue, checkWinner};
})();

let displayController = (function(){

  function displayBoard(){

    let wrapper = document.querySelector('#wrapper');
    let board = document.createElement('div');

    //inserting the board
    console.log(wrapper.lastChild);
    wrapper.insertBefore(board, document.querySelector('#restart-button'));
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
    }
  }

  function addEventListeners(){

  }

  function endMatch(){

  }

  function removeBoard(){

  }

  function displayForm(){

  }

  function displayWinner(){

  }

  return {displayBoard, addEventListeners, endMatch};
})();

//Player Factory Function

function Player(){
  let name = '';
  let sign = '';
  return {name, sign}
}

displayController.displayBoard();
