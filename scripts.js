
const board = document.getElementById("game-board");
   
const gameBoard = (() => {
    let array = ["","","","","","","","",""];
   
   
    const render = () => {
        let i = 0;
        array.forEach(element => {
        let square  = document.createElement("div");
        square.setAttribute("id",`cell-${i++}`);
        square.classList.add("square");
        square.textContent = element;
        board.appendChild(square);
    }) 
    const cells = board.querySelectorAll(".square");
    cells.forEach(cell => {
    cell.addEventListener("click", Game.handleClick);
})
    
}
const update = (index, value) =>{
    array[index] = value; 
}

const getBoard = () => array;


return {
    render,
    update,
    getBoard
}
//Add Event Listeners + DOM objects here 
})();



function createPlayer (name,shape) {
    return { name,shape };
  }
 
  const Game = (() => {
    let players;
    let gameOver;
    let currentPlayer;



    const restart = () =>{
        for(i = 0; i < 9; i++){
            gameBoard.update(i,"");
        }
        const cells = board.querySelectorAll(".square");
        cells.forEach(cell => {
        cell.textContent = "";
        cell.onClick = false;
    })

    
    }
    
    const start = (event) => {
    if (event.target.onClick){
        restart(); 
    }
    else{
        gameBoard.render();
    }
    event.target.onClick = true;
   


    players = [createPlayer("Player 1", "X"),createPlayer("Player 2", "O")];
    gameOver = false;
    currentPlayer = 0;
     
    
    }

    let handleClick = (event) => {
        if(event.target.onClick){
            return;
        }

        if(gameOver){
            return;
        }
        let index = parseInt(event.target.id.split("-")[1]);
        event.target.textContent = players[currentPlayer].shape;
        
        gameBoard.update(index, players[currentPlayer].shape);

        if(checkForWin(gameBoard.getBoard(),players[currentPlayer].shape)){
            gameOver = true;
            alert(`${players[currentPlayer].name} won`);
        }
        else if(checkForTie(gameBoard.getBoard())){
            gameOver = true;
            alert(`It's a Tie`);
        }
        event.target.onClick = true;
        currentPlayer = currentPlayer === 0 ? 1: 0; 
    
    }

    

    return {
        start,
        handleClick,
    }

  })();

  function checkForWin(board){
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i = 0; i < winningCombinations.length; i++){
        const [a,b,c] = winningCombinations[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return true;
        }
    }
    return false;
  }

  function checkForTie(board) {
    return board.every(cell => cell !== "")
  }

 
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", Game.start)




  

 
//Game Object with control the flow of the game

  
  