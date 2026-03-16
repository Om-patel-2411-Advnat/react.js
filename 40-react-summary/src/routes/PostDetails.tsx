import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Modal from '../components/Modal';
import classes from './PostDetails.module.css';
import { fetchPostDetails , PostStructure } from '../Utils/http';

export default function PostDetails() {

    const { id } = useParams<{id : string}>();

    const {data : post , isLoading , isError} = useQuery<PostStructure>({
        queryKey : ['posts' , id],
        queryFn : () => fetchPostDetails(id!),
        enabled: !!id
    })

    if(isLoading){
        return <p>Loading...</p>
    }
    if(isError){
        return <p>Failed to fetch details</p>
    }

    if (!post) {
        return (
            <Modal>
                <main className={classes.details}>
                    <h1>Could not find post</h1>
                    <p>Unfortunately, the requested post could not be found.</p>
                    <p>
                        <Link to=".." className={classes.btn}>
                            Okay
                        </Link>
                    </p>
                </main>
            </Modal>
        );
    }
    return (
        <Modal>
            <main className={classes.details}>
                <p className={classes.author}>{post.author}</p>
                <p className={classes.text}>{post.body}</p>
                <p>
                    <Link to=".." className={classes.btn}>
                        Okay
                    </Link>
                </p>
            </main>
        </Modal>
    );
}
