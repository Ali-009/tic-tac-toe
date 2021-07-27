//Player Factory Function
function Players(name){
  let score = 0;
  return {name, score};
}

//A module that contains the gameBoardArray, can create a board, and can update it
let gameBoard = (function(){
  let gameBoardArray = [];

  function createBoard(){

    //resetting gameBoardArray
    gameBoardArray = [];

    let wrapper = document.querySelector('#wrapper');
    let board = document.createElement('div');
    wrapper.appendChild(board);
    board.setAttribute('id','board');

    //creating cells within the board
    for(let i = 0; i < 9; i++){
      let boardCell = document.createElement('div');
      boardCell.classList.add('board-cell');
      board.appendChild(boardCell);
      if(i === 0 || i === 3 || i === 6){
        boardCell.style.borderLeft = 'none';
      }
      if(i === 6 || i === 7 || i === 8){
        boardCell.style.borderBottom = 'none';
      }

      boardCell.addEventListener('click', updateBoard);
    }
  }

  function updateBoard(e){

    if(e.target.textContent){
      return;
    }

    if(gameBoardArray.length % 2 === 0){
      gameBoardArray.push('x');
      e.target.textContent = 'X';
    } else{
      gameBoardArray.push('o');
      e.target.textContent = 'O';
    }
  }

  return{gameBoardArray, createBoard};
})();


//Initialize Game
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
