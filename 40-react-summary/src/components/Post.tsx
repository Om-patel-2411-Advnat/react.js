import { Link } from 'react-router-dom';
import classes from './Post.module.css';

const Post: React.FC<{id: string , author: string , body: string}>  = ({id, author , body})=>{

    return(
        <li className={classes.post}>
            <Link to={id}>
                <p className={classes.author}>{author}</p>
                <p className={classes.text}>{body}</p>
            </Link>
        </li>
    );
}
export default Post;