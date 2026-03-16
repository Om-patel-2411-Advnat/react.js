import { useNavigate } from 'react-router-dom';
import classes from './Modal.module.css';

const Modal: React.FC<{ children: React.ReactNode }> = ({children}) =>{

    const navigate = useNavigate();

    function closeHandler(){
        navigate('..');
    }

    return (
        <>
            <div className={classes.backdrop} onClick={closeHandler} />
            <dialog open className={classes.modal}>
                {children}
            </dialog>
        </>
    )
}

export default Modal ;