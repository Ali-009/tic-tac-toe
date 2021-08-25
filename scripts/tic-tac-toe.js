//Player Factory Function
function Player(sign){
  let name = '';
  return {name, sign}
}
/*Player and gameBoard only hold data. Operations are done using the
gameFlow and displayController modules*/

//Modules
let gameBoard = (function(){
  let state = [];
  return {state};
})();

let gameFlow = (function(){

  let player1 = Player('X');
  let player2 = Player('O');

  let winnerLineIndices = [];

  function startGame(){

    /*startGame() is also used in _restartGame(), therefore
    it is necessary to clear gameBoard.state and gameFlow.winnerLineIndices*/
    if(gameBoard.state.length > 0){
      gameBoard.state = [];
      gameFlow.winnerLineIndices = [];
    }

    displayController.displayBoard();
    displayController.makeInteractive();
  }

  function checkWinner(){
    /*Ending the match if all the cells are filled.
    The function doesn't return after this step because a winning line
    still needs to be checked for*/
    let filledCells = gameBoard.state.filter(cell => cell);
    if(filledCells.length === 9){
      displayController.endMatch();
    }

    //checking horizontal lines
    for(let i = 0; i < 9; i = i + 3){
      if(gameBoard.state[i]){
        if(gameBoard.state[i] === gameBoard.state[i + 1] &&
          gameBoard.state[i] === gameBoard.state[i + 2]){
            gameFlow.winnerLineIndices = [i, i + 1, i + 2];
        }
      }
    }

    //checking vertical lines
    for(let i = 0; i < 3; i++){
     if(gameBoard.state[i]){
       if(gameBoard.state[i] === gameBoard.state[i + 3] &&
         gameBoard.state[i] === gameBoard.state[i + 6]){
           gameFlow.winnerLineIndices = [i, i + 3, i + 6];
       }
     }
   }

    //checking diagonal lines
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

      boardCell.textContent = gameBoard.state[i];
    }

    //show winning combination
    if(gameFlow.winnerLineIndices.length != 0){
      for(let i = 0; i < 3; i++){
          const boardCell =
              document.querySelector(`#cell-${gameFlow.winnerLineIndices[i]}`);
          boardCell.style.color = 'red';
      }
    }
  }
  /*Adds event listeners where needed. This is separated from displayBoard()
  to have the option of creating non-interactive game boards that display
  the board state after the match is over*/
  function makeInteractive(){
    const boardCells = document.querySelectorAll('.board-cell');

    boardCells.forEach(cell => cell.addEventListener('click',
        _handleClickEvent));

    const restartBtn = document.querySelector('#restart-button');
    restartBtn.addEventListener('click', _restartGame);
  }

  /*removes the HTML elements, and calls gmaeFlow.startGame() to
  start a game with a new board*/
  function _restartGame(e){
    const board = document.querySelector('#board');
    const form = document.querySelector('#form-container');
    const gameResult = document.querySelector('#game-result');

    if(board){
      board.remove();
    }
    if(form){
      form.remove();
    }
    if(gameResult){
      gameResult.remove();
    }

    gameFlow.startGame();
  }
  //Handles click events on cells
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
  }
  /*After the match ends, creates a form where players can input their names,
  afterwhich the winner is displayed*/
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

    submitBtn.addEventListener('click', _submitNames);

    form.appendChild(submitBtn);
  }

  function _submitNames(e){
    gameFlow.player1.name =
        document.querySelector('#player1-name').value;
    gameFlow.player2.name =
        document.querySelector('#player2-name').value;

    document.querySelector('#form-container').remove();
    displayBoard();
    _displayWinner();
  }

  function _displayWinner(){
    const wrapper = document.querySelector('#wrapper');
    const gameResult = document.createElement('p');

    gameResult.setAttribute('id', 'game-result');

    if(gameFlow.winnerLineIndices.length === 0){
      gameResult.textContent = 'The game resulted in a tie.';
    }

    //Extracting the value on the winnerLineIndices
    let winnerSign = gameBoard.state[gameFlow.winnerLineIndices[0]];

    if(winnerSign === 'X'){
      gameResult.textContent =
          `Congratulations ${gameFlow.player1.name}! You won.`;
    } else if(winnerSign === 'O'){
      gameResult.textContent =
          `Congratulations ${gameFlow.player2.name}! You won.`
    }

    gameResult.style.marginTop = '30px';

    wrapper.insertBefore(gameResult,
          document.querySelector('#restart-button'));
  }

  return {displayBoard, makeInteractive, endMatch};
})();
//Starts the game in the global scope
gameFlow.startGame();
