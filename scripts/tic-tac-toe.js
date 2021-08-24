//Player Factory Function

function Player(sign){
  let name = '';
  return {name, sign}
}

//Modules

let gameBoard = (function(){
  let state = [];
  return {state};
})();

let gameFlow = (function(){

  let player1 = Player('X');
  let player2 = Player('O');

  function startGame(){
    displayController.displayBoard();
    displayController.makeInteractive();
  }

  let winnerLineIndices = [];

  function checkWinner(){

    let filledCells = gameBoard.state.filter(cell => cell);

    if(filledCells.length === 9){
      displayController.endMatch();
    }

    //horizontal lines
    for(let i = 0; i < 9; i = i + 3){
      if(gameBoard.state[i]){
        if(gameBoard.state[i] === gameBoard.state[i + 1] &&
          gameBoard.state[i] === gameBoard.state[i + 2]){
            gameFlow.winnerLineIndices = [i, i + 1, i + 2];
        }
      }
    }

    //vertical lines
    for(let i = 0; i < 3; i++){
     if(gameBoard.state[i]){
       if(gameBoard.state[i] === gameBoard.state[i + 3] &&
         gameBoard.state[i] === gameBoard.state[i + 6]){
           gameFlow.winnerLineIndices = [i, i + 3, i + 6];
       }
     }
   }

    //diagnol rewritten
    for(let i = 0; i <= 2; i = i + 2){
      if(gameBoard.state[0 + i]){
        if(gameBoard.state[0 + i] === gameBoard.state[4] &&
             gameBoard.state[0 + i] === gameBoard.state[8 - i]){
          gameFlow.winnerLineIndices = [0 + i, 4, 8 - i];
        }
      }
    }

    if(gameFlow.winnerLineIndices.length != 0){
      displayController.endMatch();
    }
  }

  return {startGame, player1, player2, checkWinner, winnerLineIndices};
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
    document.querySelector('#board').remove();
    _displayForm();
    _displayWinner();
  }

  function _displayForm(){

    const form = document.createElement('div');
    form.setAttribute('id', 'form-container');

    const wrapper = document.querySelector('#wrapper');
    wrapper.insertBefore(form, document.querySelector('#restart-button'));

    const sign = ['X','O'];

    //Creating input fields for two players
    for(let i = 0; i < 2; i++){
      const label = document.createElement('label');
      label.setAttribute('for', `player${i+1}-name`);
      label.textContent = `${sign[i]} Player: `

      const input = document.createElement('input');
      input.setAttribute('id', `player${i+1}-name`);
      input.setAttribute('name', `player${i+1}-name`);

      input.setAttribute('type', 'text');

      form.appendChild(label);
      form.appendChild(input);
    }

    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('id','submit-names');
    submitBtn.textContent = 'Enter';

    form.appendChild(submitBtn);
  }

  function _displayWinner(){

  }

  return {displayBoard, makeInteractive, endMatch};
})();

gameFlow.startGame();
