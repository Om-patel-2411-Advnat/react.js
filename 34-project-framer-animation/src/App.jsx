import { useState } from 'react';
// for animation import this 
import { motion } from 'framer-motion';

function App() {
  const [X, setX] = useState(0);
  const [Y, setY] = useState(0);
  const [Rotate, setRotate] = useState(0);

  return (
    <div id="demo">
      {/* update the element you wanna animate */}
      <motion.div 
        id="box" 
        // after updating element you can add animation attribute and it needs an object and inside this you can apply your animation (you can animate color , background-color , rotate etc...)
        // you can apply state value to update the animation as we did here
        animate={{ x : X , y : Y , rotate : Rotate }} 

        // this is another important prop of the motion which is a props that can be used to configure the animation that will be played 
        // here you also have to pass an object
        // you can set many things like duration, 
        transition={{ 
          duration : 0.3, // seconds
          // bounce : 0.5, // the value of bounce should be (0 to 1)
          type : 'spring',
         }} 
      />

      <div id="inputs">
        <p>
          <label htmlFor="x">X</label>
          <input
            type="number"
            id="x"
            onChange={(event) => setX(+event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="y">Y</label>
          <input
            type="number"
            id="y"
            onChange={(event) => setY(+event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="rotate">Rotate</label>
          <input
            type="number"
            id="rotate"
            onChange={(event) => setRotate(+event.target.value)}
          />
        </p>
      </div>
    </div>
  );
}

export default App;
