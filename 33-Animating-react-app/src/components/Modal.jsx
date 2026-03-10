import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  // you can reuse the animation like that also 
  // const HiddenAnimation = { opacity: 0, y: 50 };
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog 

        // for reuse the component we have another prop here 
        // variants just not used to defining andd reusing animation state but instead they can also be used to trigger animation deep inside of a component tree by just setting an animation to a certain variant on an ancestor component.
        variants={{
          // here into the object you can set any key of your choice example here we add hidden and the value will be the animation object
          // and by doing that we are defining a custom identifier and than the animation state that should be applied is this identifier is targeted 
          hidden : { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 } ,
        }}


        // here in dialog we don't have any initial value so we ca use another props of framer-motion to set the initial value 
        // this allows us to set up the initial state to start animation and this will be assume immediately once this dialog is added to the dom 
        initial="hidden" //it should be the same key you have set into the variants 
        animate="visible"

        // now if you want to add animation when this dialog box is disappear than you can use another props exit
        exit="hidden"

        open 
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}
