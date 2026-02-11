import Player from './components/Player.jsx';
import Timmerchallenge from './components/Timmerchallenge.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <Timmerchallenge title = "Easy" targetTime={1}/>
        <Timmerchallenge title = "Not Easy" targetTime={5}/>
        <Timmerchallenge title = "Gettig tough" targetTime={10}/>
        <Timmerchallenge title = "pros only" targetTime={15}/> 
      </div>
    </>
  );
}

export default App;
