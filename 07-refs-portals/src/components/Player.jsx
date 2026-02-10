import { useState } from "react";

export default function Player() {

  const [player , setplayer] = useState('');
  const [isSubmited , setSubmited] = useState (false);

  function Handleplayer(e){
    setSubmited(false);
    setplayer(e.target.value);
  }
  function Handleclick(){
    setSubmited(true);
  }
  
  
  return (
    <section id="player">
      <h2>Welcome {isSubmited ? player : 'unknown entity'}</h2>
      <p>        
        <input type="text" onChange={Handleplayer} value={player}/>
        <button onClick={Handleclick}>Set Name</button>
      </p>
    </section>
  );
}
