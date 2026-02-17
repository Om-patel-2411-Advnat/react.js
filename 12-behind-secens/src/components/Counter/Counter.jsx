// memo is a in-build react function that you can wrap around your component function ans that will prevent unnecessary component function executions 
// you can not directly export a memo function you have to store it into a variable and than you can export that variable as we did here
// here when app component is execute again this component function will also re-execute because it's define in app component but to prevent this we are using memo here 
// it will first check which are the props that this component is dependant on and than it will check tha value of props is same as before or not if the value are same (props not changed) than this memo function will prevent the re-execution of the component and if the value of props change than it will re-execute the component
// keep in mind that memo will not prevent the internal state update it will re-execute if any internal state is changes (internal state means state that are defined into the component not into parent component)
// checking props cost performance :- so don't wrap it around all the components which is unnecessary 
// use it as high up in the component tree as possible

import { useState , memo , useCallback} from 'react';

// don't mix this useMemo hook with the memo and the difference is memo is wrapped around the component functions and useMemo is wrapped around the normal function that are executes in a component function to prevent there execution 
// note :- useMemo should be only used is you have a complex calculation that you want to prevent don't use it for simple calculations 
// for using it we will wrap the function where it is being called 
import { useMemo } from 'react';
import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import CounterHistory from './CounterHistory.jsx';

function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const Counter =  memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

  // here this value initialCount is only change if we click on the set button and this isPrime function will only return the new result and if the initialCount is not change and if the counter component is only re-executed because the counter state changed so the isPrime will always produce the same result 
  // re-executing function like isPrime all the time even though it will produce same result is not very efficient 
  // as you prevent the re-execution of the component bu using memo you also want to stop the re-execution of the normal functions 
  // you can do that by using another hook useMemo hook and it is not same as memo so please not mix them 
  // let's see how we can use useMemo hook 
  // you have to wrap this function calling into the hook and than you have to pass it like a function as shown below
  // it also wants and dependencies array 
  // same like memo  don't use useMemo hook around all you your function because it needs to check every time the component is executing so only use it when the calculation is complex and you want to prevent it's execution 
  const initialCountIsPrime = useMemo(() => isPrime(initialCount) , [initialCount]);

  // now here we want to do one more thing is like when we set the value of counter it's rally not changing the initial value so for updating that we can use useEffect 
  // but as we know we have to use useEffect as minimal as we can instead of that here we can solve this with the help of key 
  // we just have to pass a key to this component as we do to this component where ever we are using it here we are using it into the app component
  // useEffect (() => {
  //   setcounterChange([{ value: initialCount, id: Math.random() * 100 }]);
  // } ,[initialCount])

  // const [counter, setCounter] = useState(initialCount);
  const [counterChange, setcounterChange] = useState([{ value : initialCount, id: Math.random() * 100} ,]);

  const currentCounter = counterChange.reduce(
    (prevCounter , counterChange) => prevCounter + counterChange.value ,
    0
  );

  // here we are going to use useCallback which will prevent the unnecessary execution of the fu
  const handleDecrement = useCallback(function handleDecrement() {
    // setCounter((prevCounter) => prevCounter - 1);
    setcounterChange((prevCounterChange) => [{ value: -1, id: Math.random() * 100 } , ...prevCounterChange]);
  } , []);

  const handleIncrement = useCallback(function handleIncrement() {
    // setCounter((prevCounter) => prevCounter + 1);
    setcounterChange((prevCounterChanges) => [{ value: 1, id: Math.random() * 100 }, ...prevCounterChanges]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChange}/> 
    </section>
  );
})

export default Counter ;
