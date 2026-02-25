import { useRef , useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({children , open , className}){

    const dialog = useRef();

    useEffect(()=>{
        if(open){
            dialog.current.showModel();
        }
    } , [open])

    return createPortal(
        <dialog open={open} ref={dialog} className={`modal ${className}`}>
            {children}
        </dialog>
        , document.getElementById('modal'))
}