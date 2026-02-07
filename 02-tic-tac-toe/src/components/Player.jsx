import { useState } from "react";

export default function Player({name ,symbol}){

    const [playername , setplayername] = useState(name);
    const [ isEditing , SetisEditing] = useState(false);

    function handleEditclick(){
        // when you try to update value like this than react will update the schedule managed behind the scenes by react 
        // state update will not perform instantly but at some point in the future (although future means 1 or 2 milli seconds but still) it's not good
        // SetisEditing(!isEditing);

        // for avoiding this we will use the function into the setter function of a use state 
        SetisEditing((editing)=> !editing);
    }
    function handleChange(event){
        setplayername(event.target.value);
    }

    let playerinput = <span className="player-name" >{playername}</span>;
    let btncaption = 'Edit';

    if(isEditing){
        playerinput =
        <input type="text" required defaultValue ={playername} onChange={handleChange}></input>;
        btncaption = 'Save';
    }

    return(
        <li>
            <span className="player">
                {playerinput}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button 
            
            onClick={() => handleEditclick()}
            >
                {btncaption}
            </button>
        </li>
    );
}