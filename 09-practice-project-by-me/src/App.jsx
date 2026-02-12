import NewProject from "./components/NewPeoject.jsx";
import Sidebar from "./components/ProjectSidebar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx"
import { useState } from "react";

function App() {

  const [createNew , setCreateNew] = useState(false);

  function Handlenew(){
    setCreateNew(prev => !prev);
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onSelect={Handlenew}/>
      {createNew ? <NewProject/> : <NoProjectSelected onSelect={Handlenew}/>}
    </main>
  );
}

export default App;
