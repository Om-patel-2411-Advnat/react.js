import Post from "./Post.jsx";
import classes from './PostList.module.css';

export default function PostList({posts}) {

    return (
        <>
            {posts.length > 0 &&
                <ul className={classes.posts}>
                    {posts.map(post => (
                        <Post key={post.body} id={post.id} author={post.author} body={post.body} />
                    ))}
                </ul>
            }
            {posts.length === 0 &&
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <h2>There is no Posts yet.</h2>
                    <p>Start adding notes!!</p>
                </div>
            }
        </>
    )
}