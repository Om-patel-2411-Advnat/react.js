import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import Configure from './components/Counter/Configure.jsx';

function App() {
  log('<App /> rendered');


  const [chosenCount, setChosenCount] = useState(0);

  // now as you know the concept of useState is that you can never use updated state value just after updating it like here you are using it to log the value and it will give the old value as a result 
  // one more thing is that if you are using multiple set counter functioninto the same function it will not re-execute the whole app component multiple times but it will just excutes one time and this all funcion will be scheduled to execute and here one more thing is written below how to use the function to get the updated value 
  function HandlesetCount(newCount){
    // all function written here will be executed line by line so first counter will set the value and than the other will 
    setChosenCount(newCount);
    // but if you are using counter function like this than it will not use updated value but it will overwrite the old value and the update of first counter will be gone 
    // now here if we set the value in first counter 10 than we expect the new value after this counter should be 11 but it will be only 1 because it will override the old value 
    // setChosenCount(chosenCount + 1)

    // that's why using updated value you have to use with the dummy function like this
    // now here you will get 11 as a updated value 
    setChosenCount((prevcount)=>prevcount + 1)
    console.log(chosenCount);
  }

  return (
    <>
      <Header />
      <main>
        {/* here we use clever structuring so we don't have to use memo for every component so we create another component and move the state to the component and this will stop the re-execution of the whole app component instead it will just re-execute the component where the state is changing */}
        {/* <section id="configure-counter">
          <h2>Set Counter</h2>
          <input type="number" onChange={handleChange} value={enteredNumber} />
          <button onClick={handleSetClick}>Set</button>
        </section> */}
        <Configure onset={HandlesetCount}/>
        {/* when ever the key value change the react will throw away the old component and recreate a new component after change */}
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
