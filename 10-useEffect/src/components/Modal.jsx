import { useRef , useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({open , children , onClose }) {
  const dialog = useRef();


  // we are going to handle this using side effect
  // useImperativeHandle(ref, () => {
  //   return {
  //     open: () => {
  //       dialog.current.showModal();
  //     },
  //     close: () => {
  //       dialog.current.close();
  //     },
  //   };
  // });

  // now till we are not using the useEffect now we will 

  // if we are using this without the useEffect tha we are going to get error because at initially the dialog ref is not connected to the JSX code because it's not executed yes so the value of the ref will be undefine and this will give error
  // if(open){
  //   dialog.current.showModal();
  // }else{
  //   dialog.current.close();
  // }

  // so for this condition we will useEffect because as we learn useEffect execute after the component function is executed so let's how we can do this with useEffect
  // here we are not using useEffect to prevent the infinite loop but we are using it to manage value of the ref
  // now here we have to add some dependencies not like the useEffect in the app component because there we don't have any dependencies there but here we have the dependencies so it ir mandatory to add dependencies into the array
  // effect dependencies are in the end props or state values   
  useEffect(() => {
    if(open){
      dialog.current.showModal();
    }else{
      dialog.current.close();
    }
  } ,[open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {/* now we have to print this children means dialog box conditionally because we don't want thee timer to start at the first */}
      {/* after doing this the timmr funtion will execute if the place is clicked  */}
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
};
