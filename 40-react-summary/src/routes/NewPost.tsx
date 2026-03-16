import { Link , Form , useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import classes from './NewPost.module.css';
import Modal from '../components/Modal';
import { sendingData , newPostStructure , queryClient } from '../Utils/http';

export default function NewPost() {

    const navigate = useNavigate();

    const {mutate } = useMutation({
        mutationFn : sendingData ,
        onSuccess : ()=>{
            queryClient.invalidateQueries({queryKey : ['posts']}),
            navigate('/')
        }
    })

    function HandleSubmit(event : React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData) as newPostStructure;

        mutate(data);
    }

    return (
        <Modal >
            <Form onSubmit={HandleSubmit} className={classes.form} >
                <p>
                    <label htmlFor="body">Text</label>
                    <textarea id="body" name='body' required rows={3} />
                </p>
                <p>
                    <label htmlFor="name">Your name</label>
                    <input type="text" name='author' id="name" required />
                </p>
                <p className={classes.actions}>
                    <Link to='..' type='button'>Cancel</Link>
                    <button>Submit</button>
                </p>
            </Form>
        </Modal>
    );
}
