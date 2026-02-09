export default function Gameboard({onselect , board}){

    // we need this code in a app.jsx for checking the winning combination so i ma moving this code into the app.js
    // let gameboard = initialGameboard;

    // for(const turn of turns){
    //     let {square ,player} = turn;
    //     let {row ,col} = square;

    //     gameboard[row][col] = player;
    // }

    // we commented out this code because now we want to add a log feature down at the game which will keep track on user who clicked and what symbol and for this we have use same feature like lift uo state for this but the app.jsx already has the lift up for the other two components and it's not good way to add one more because at the end Gamebord.jsx and Log.jsx both gonna use the same data of the user so we can mange them with one state only

    // now we will handle this all in a parent section 
    // const [gameboard , setgameboard] = useState(initialGameboard);

    // function HandleBoard(rowIndex , colindex ){
    //     setgameboard ((prevGameboard) => {
    //         // if your state is object or array you should update your state in an immutable way ,which simply means you should first creat a copy of an array than use it not directly takeing array or object as an argument and use them let's see how we can do that

    //         const upadatedBoard = [...prevGameboard.map((innerArray) => [...innerArray])]
    //         upadatedBoard[rowIndex][colindex] = activeplayersymbol;
    //         return upadatedBoard;
    //     })
    //     onselect();
    // }

    return (
        <ol id="game-board">
            {board.map((row , rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playersymbol , colindex) => (
                        <li key={colindex}>
                            <button onClick={() => onselect(rowIndex ,colindex)}
                                disabled = {playersymbol !== null}  
                            >{playersymbol}</button>   
                        </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}