import Input from "./Input";
import { useRef } from "react";
import Modal from "./Model";

export default function NewProject({ onAdd , onCancel}) {

    const modal = useRef();

    const titleRef = useRef();
    const descriptionRef = useRef();
    const dateRef = useRef();

    function HandleSave() {
        const enteredTitle = titleRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredDate = dateRef.current.value;

        if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDate.trim() === ''){
            modal.current.open();
            return ;
        }

        onAdd(
            {
                title : enteredTitle,
                description : enteredDescription,
                dueDate : enteredDate,
            }
        )
    }

    return (
        <>
            <Modal ref={modal} buttonCaption={'Okay'}>
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">OOPS... you forgot to enter a value</p>
                <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field</p>
            </Modal>
            <div className="w-[35rem] mt-16 ">
                <menu className="flex items-center justify-end gap-4 my-4 ">
                    <li>
                        <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</button>
                    </li>
                    <li>
                        <button
                            className=" px-6 py-2 rounded-md text-stone-50 bg-stone-800 hover:bg-stone-950"
                            onClick={HandleSave}
                        >Save</button>
                    </li>
                </menu>
                <div>
                    <Input type ="text" label={'Title'} ref={titleRef} />
                    <Input label={'Description'} textarea ref={descriptionRef} />
                    <Input type ="date" label={'Due Date'} ref={dateRef} />
                </div>
            </div>
        </>
    )
}