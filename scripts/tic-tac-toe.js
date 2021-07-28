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

    if(e.target.textContent){
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

  function checkWinner(boardState){

    //horizontal lines
    for(let i = 0; i < 9; i = i + 3){
      if(boardState[i] === boardState[i + 1] &&
        boardState[i] === boardState[i + 2]){
          if(boardState[i]){
            console.log('we have a winner');
          }
      }
    }
    //vertical lines
    for(let i = 0; i < 3; i++){
      if(boardState[i] === boardState[i+3] &&
        boardState[i] === boardState[i+6]){
        if(boardState[i]){
          console.log('we have a winner');
        }
      }
    }
    //diagonal lines
    if(boardState[0]){
      if(boardState[0] === boardState[4] && boardState[0] === boardState[8]){
        console.log('we have a winner');
      }
    }else if(boardState[2]){
      if(boardState[2] === boardState[4] && boardState[2] === boardState[6]){
        console.log('we have a winner');
      }
    }
  }
  return {checkWinner};

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
    }
    gameBoard.createBoard();
}

startGame();
