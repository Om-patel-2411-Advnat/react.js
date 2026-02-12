import { createPortal } from 'react-dom';
import { useImperativeHandle } from 'react';
import { useRef } from 'react';
import Button from './Button';

export default function Modal({children ,ref ,buttonCaption}){

    const dialog = useRef();
    useImperativeHandle(ref, ()=>{
        return{
            open(){
                dialog.current.showModal();
            }
        }
    })

    return createPortal(
        <dialog ref={dialog} className='top-1/3 left-1/3 backdrop:bg-stone-900/90  p-4 rounded-md shadow-md'>
            { children }
            <form method ="dialog" className='mt-4 text-right'>
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>
        , document.getElementById('modal-root')
    );
}