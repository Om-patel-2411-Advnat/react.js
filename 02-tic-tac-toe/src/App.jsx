import { useState } from 'react';
import Player from "./components/Player.jsx";
import Gameboard from "./components/Gameboard.jsx";
import Log from './components/Log.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from './components/Gameover.jsx';

const PLAYERS = {
  X : 'player 1',
  O :'player 2'
}

const INITIAL_GAME_BOARD = [
    [null ,null ,null],
    [null ,null ,null],
    [null ,null ,null]
];


function deriveactiveplayer(gameturns){
  let currentplayer = 'X';

  if(gameturns.length > 0 && gameturns[0].player === 'X'){
    currentplayer = 'O';
  }
  return currentplayer;
}

function deriveWinner(gameboard , player){
  let winner;

  for (const combination of WINNING_COMBINATIONS ){
    const firstSqaureSymbol = gameboard [combination[0].row][combination[0].col];
    const secondSqaureSymbol = gameboard [combination[1].row][combination[1].col];
    const thirdSqaureSymbol = gameboard [combination[2].row][combination[2].col];

    if(firstSqaureSymbol && firstSqaureSymbol === secondSqaureSymbol && firstSqaureSymbol === thirdSqaureSymbol){
      winner = player[firstSqaureSymbol].toUpperCase();
    }
  }
  return winner ; 
}

function deriveGameboard(gameturns){
  let gameboard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for(const turn of gameturns){
      let {square ,player} = turn;
      let {row ,col} = square;

      gameboard[row][col] = player;
  }
  return gameboard;
}

function App() {

  const [player , setplayer] = useState(PLAYERS)
  const [gameturns , setgameturns] = useState([]);
  // here we are using two state but we can make it work with only one state and it's very good practice to use as minimal state as you can
  // const [activePlayer ,setActiveplayer] = useState('X');

  let currentplayer = deriveactiveplayer(gameturns);
  const gameboard = deriveGameboard(gameturns);
  const winner = deriveWinner(gameboard , player);
  const hasDraw = gameturns.length === 9 && !winner ;

  function HandleActiveplayer (rowIndex , colIndex){
    // setActiveplayer((currentplayer)=> currentplayer ==='X' ? 'O': 'X');

    setgameturns(prevturn => {

      let currentplayer = deriveactiveplayer(prevturn);

      const updateturn = [
        // here we are merging teo states so we can't say that activeplayer value  will work truly so for avoiding this we can create a variable how has current value and than add condition on it
        {square : {row : rowIndex , col : colIndex}, player : currentplayer} ,
        ...prevturn]

      return updateturn;  
    });
  }

  function Handlerestart(){
    setgameturns([]);
  }

  function hadlechangeofplayer(symbol , newname){
    setplayer(prevplayer => {
      return {
      ...prevplayer,
      [symbol] : newname
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player" >
          <Player name = {PLAYERS.X} symbol = 'X' isActive = {currentplayer === 'X'} onchangename={hadlechangeofplayer}/> 
          <Player name = {PLAYERS.O} symbol = 'O' isActive = {currentplayer === 'O'} onchangename={hadlechangeofplayer}/>
        </ol>
        {(winner || hasDraw ) && <GameOver winner = {winner} onRestart = {Handlerestart}/>}
        <Gameboard onselect = {HandleActiveplayer} board = {gameboard}/> 
      </div>
      <Log turns = {gameturns}/>
    </main>
  )
} 

export default App
