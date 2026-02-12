import { useState } from "react"

export default function NewTask({onAdd}){

    const [enteredTask , setenteredTask] = useState('');

    function HandleTask(e){
        setenteredTask(e.target.value);
    }

    function HandleClick(){
        onAdd(enteredTask)
        setenteredTask('');
    }

    return(
        <div className="flex items-center gap-4">
            <input 
                type="text" 
                className="w-80 px-2 py-2 text-base rounded-sm bg-stone-200"
                onChange={HandleTask}
                value={enteredTask}
            />
            <button 
                className="text-stone-300 bg-stone-800 hover:bg-stone-700 hover:text-stone-200 py-2 px-2 rounded-md"
                onClick={HandleClick}
            >
                Add Task
            </button>
        </div>
    )
}