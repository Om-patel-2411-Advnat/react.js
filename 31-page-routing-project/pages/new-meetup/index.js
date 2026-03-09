import { useRouter } from 'next/router.js';
import Head from 'next/head';

import NewMeetupForm from '../../components/meetups/NewMeetupForm.js';

export default function NewMeetUp(){

    const router = useRouter();

    async function onAddMeetupHandler(MeetupData){
        const response = await fetch('/api/new-meetup' , {
            method : 'POST',
            body: JSON.stringify(MeetupData),
            headers: {
                'Content-Type' : 'application/json' 
            }
        });

        const data = await response.json();

        console.log(data);

        router.push('/');
    }

    return(
        <>
            <Head>
                <title> Add a new Meetup </title>
                <meta name='description' content='Add your own meetup!!' />
            </Head>
            <NewMeetupForm onAddMeetup={onAddMeetupHandler}/>
        </>
    )
}