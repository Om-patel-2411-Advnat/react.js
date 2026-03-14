import classes from './TodoItem.module.css';

const TodoItem : React.FC<{text : string ; onremoveTodo: ()=> void}> = (props) =>{
    return(
        <li className={classes.item} onClick = {props.onremoveTodo} >{props.text}</li>
    )
}

export default TodoItem ;