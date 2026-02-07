import Header  from "./components/Header/Header.jsx";
import CoreComponents from './components/CoreComponents.jsx';
import Example from "./components/Example.jsx";



function App() {
  return (
    <div>
      {/* you can call the component inside the return statement */}
      {/* you can call the component as many times as you want */}
      {/* this is how you can call the component with self  closing tag*/}
      <Header />
      <main>
        <CoreComponents />
        <Example />
      </main>
    </div>
  );
}

export default App;
