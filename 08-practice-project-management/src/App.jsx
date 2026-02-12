import { useState } from "react";
import NewProject from "./components/NewPeoject.jsx";
import Sidebar from "./components/ProjectSidebar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx"
import SelectedProject from "./components/SelectedProject.jsx";
import NewTask from "./components/NewTask.jsx";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks : []
  });

  function HandleAddTask(text){
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const NewTasK = {
        text : text ,
        projectId : prevState.selectedProjectId,
        id: taskId
      }

      return {
        ...prevState,
        tasks: [NewTasK , ...prevState.tasks]
      }
    })
  }

  function HandleDeleteTask(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      };
    });
  }

  function HandleProjectSelect(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function HandleCancelProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }
  
  function HandleProject(projectdata){
    setProjectsState((prevProject) =>{
      const ProjectId = Math.random();
      const NewProject = {
        ...projectdata,
        id: ProjectId
      }

      return{
        ...prevProject,
        selectedProjectId: undefined,
        projects : [...prevProject.projects , NewProject]
      }
    })
  }

  function HandleDelete(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects : prevState.projects.filter((project) =>{
          project.id !== prevState.selectedProjectId;
        })
      };
    });
  }

  let content;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject 
      onAdd={HandleProject} 
      onCancel={HandleCancelProject}
    />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected 
      onStartAddProject={handleStartAddProject} 
    />;
  }else{
    const selectedProject = projectsState.projects.find(
      project => project.id === projectsState.selectedProjectId
    )

    content = <SelectedProject 
      project={selectedProject} 
      onDelete={HandleDelete}
      onAddTask = {HandleAddTask}
      onDeleteTask = {HandleDeleteTask}
      tasks = {projectsState.tasks}
    />;
  }


  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar 
        onStartAddProject={handleStartAddProject} 
        projects={projectsState.projects} 
        onselectProject = {HandleProjectSelect} 
      />
      {content}
    </main>
  );
}

export default App;
