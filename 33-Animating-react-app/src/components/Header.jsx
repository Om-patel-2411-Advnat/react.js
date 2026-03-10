import { useState } from 'react';
import { AnimatePresence , motion } from 'framer-motion';

import NewChallenge from './NewChallenge.jsx';

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
    {/* here this new challenge is immediately remove from the dom if th value is become false so for control it we have to wrap is around this  */}
    {/* after wrapping it react will check that in this provided component if any element has the exit prop than it will perform the animation first an than remove the element from the dom */}
    <AnimatePresence>
      {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
    </AnimatePresence>

      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button 
          // if we want to animate this button with the animate prop than we also have to listen the hover props like that it is possible but we can do it in simple way
          // onHoverStart={{}}
          // onHoverEnd={{}}
          // animate={{}}

          // if you wan to animate the elements as users click them or hover over them , framer motion gives you some special props you can add to those framework components
          whileHover={{ scale : 1.1 , backgroundColor : '#8b11f0' }}
          transition={{ type : 'spring' , stiffness : 500 }}

          onClick={handleStartAddNewChallenge} 
          className="button"
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
