// you can hold the error data message is thrown from the another component this can be happen because of another react hook
import { useRouteError } from 'react-router-dom'

import PageContent from "../components/PageContent.js";
import MainNavigation from '../components/MainNavigation.js';

export default function ErrorPage(){

    // this will give us new error object this object depends on what kind of response you are sending 
    const error  = useRouteError();

    let title = 'An error occured';
    let message = 'Something went wrong';

    if(error.status === 500){
        // when in loader you are using json function for sending the error message than you don't have to parse the data here 
        message = JSON.parse(error.data).message;
    }
    if(error.status === 404){
        title = 'Not Found';
        message = 'Could not find page ';
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}