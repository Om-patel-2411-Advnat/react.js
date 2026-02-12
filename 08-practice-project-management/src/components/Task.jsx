import NewTask from "./NewTask.jsx";

export default function Task({tasks ,onAdd , onDelete}){
    return(
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask onAdd={onAdd}/>
            {tasks.length === 0 && <p className="text-stone-800 mb-4 my-5">This project does not contain any task </p>}
            {tasks.length > 0 && (
            <ul className="p-4 mt-8 rounded-md bg-stone-100">
                {tasks.map((task) => (
                    <li key={task.id} className="h-12 flex justify-between my-4 bg-stone-200">
                        <span className="text-stone-900 flex items-center pl-2">{task.text}</span>
                        <button className="text-stone-700  hover:text-red-600 mr-5" onClick={() => onDelete(task.id)}>Clear</button>
                    </li>
                ))}
            </ul>
        )}
        </section>
    )
}