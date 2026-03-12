import { useState } from "react";
import OutPut from "./OutPut";

export default function Greeting(){

    const [changeText , setChangeText] = useState(false);

    function ChangeTextHandler (){
        setChangeText(true);
    }

    return(
        <div>
            <h2>Hello world!!</h2>
            {!changeText && <OutPut>It is good to see you</OutPut>}
            {changeText && <OutPut>Changed!!!</OutPut>}
            <button onClick={ChangeTextHandler}>Change Text !!</button>
        </div>
    );
}