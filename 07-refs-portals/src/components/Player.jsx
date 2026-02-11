import { useRef, useState } from "react";

export default function Player() {
  // with the help of this we can update the value of state at every update
  // ref will connect with the html element and than it can use every single properties of that element or tag like in input we use value 
  let player = useRef();
  // now we will try to use ref so we can connect with the html element directly and not have to use another state 
  const [playername , setplayername] = useState(null);
  // const [isSubmited , setSubmited] = useState (false);

  // function Handleplayer(e){
  //   setSubmited(false);
  //   setplayer(e.target.value);
  // }

  function Handleclick(){

    setplayername(player.current.value);

    // here we are clearing the name from the input element and this will not give any error but here we are violating rule of react to not manupulating DOM directly here we are doing that so keep this in mind to avoid it
    player.current.value = '';
    // this will get the value of every input 
    // console.log(player.current.value);
  }
  
  
  return (
    <section id="player">

      <h2>Welcome { playername ?? 'unknown entity'}</h2>
      {/* here this line will give us error because here we are trying to access the input property at the first render and at the start the value will be undefine so it will give error */}
      {/* <h2>Welcome { player.current.value ?? 'unknown entity'}</h2> */}
      <p>        
        <input 
          // this is a special props handle by the react will give us value of the input tag on every update 
          ref={player} 
          type="text" 
          // we don't need this if we use ref to get the value
          // onChange={Handleplayer} 
          // value={player}
        />
        <button onClick={Handleclick}>Set Name</button>
      </p>
    </section>
  );
}
