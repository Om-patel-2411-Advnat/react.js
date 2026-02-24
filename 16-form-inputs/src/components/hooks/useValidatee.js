import { useState } from "react";

export default function useValidate(defaultValue , validationFn){

    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const Isvalid = validationFn(enteredValue);

    function HandleInputChange(event) {
        setEnteredValue(event.target.value);
        // this was added because when ever user stop typing and if the input is wrong it will show error and when user start typing again than error will be gone and if the input is wrong the error will show again 
        setDidEdit(false)
    }

    function HandleInputBlure() {
        setDidEdit(true);
    }

    return {
        value : enteredValue, 
        HandleInputChange,
        HandleInputBlure,
        hasError : didEdit && ! Isvalid ,
    }
}