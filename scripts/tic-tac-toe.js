
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
