import { MongoClient , ObjectId } from 'mongodb';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail.js';

export default function MeetupDetails(props){
    return(
        <>
            <Head>
                <title> {props.meetupData.title} </title>
                <meta name='description' content={props.meetupData.description} />
            </Head>
            <MeetupDetail 
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    )
}

// if you want to use getStaticProps in dynamic pages than you have to export getStaticPaths function in order to getStaticProps to work
// if you are sing getServerSideProp than you don't have to use getStaticPaths function 

export async function getStaticPaths(){

    const client = await MongoClient.connect('mongodb+srv://om_db_user:om2411@cluster0.5ntp767.mongodb.net/meetups?appName=Cluster0');
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    // here we just want id's so we are going to tweak the find so it only returns the id like given below 
    // we pass an empty object as a first argument here we  could define our filter criteria if you wanna not find all documents but filter for certain field values, but here we want to find all the values of the filed which means give me all object 
    // than we pass the second argument where we can define which fields should be extracted for every document and by default all the fields will be returned (title , image etc...)  but here we are just interested in ID we can also add _id here and set it to 1 this means only include id but no other  field values 
    const meetups = await meetupCollection.find({} , { _id : 1 }).toArray();

    client.close();

    // this function will return an object 
    // in normal we will not set the id's hard codded instead we will set it to dynamic value 
    return {
        // this fallback key is important it contains ( true or false ) value 
        // false means your path contains all meetupId values that means use enters anything that's not supported let's say 'm3'  than user will face 404 error 
        // true means nextJs would try to generate a page for this meetup id ( 'm3' in this case ) dynamically on the server for the incoming request 
        // fallback is good because it let you pre-generate some of your pages for specific meetupId values , for example the page those are visited most frequently and then pre-generate the missing ones dynamically when request for them are coming in 
        fallback: 'blocking' ,
        paths : meetups.map((meetup) => ({ 
            params : { 
                meetupId : meetup._id.toString() ,   
            } 
        }))
    };  

}

// here we need getStaticPaths in dynamic page because we know that this getStaticProp function will re-executes the page for updates but we need to tell nextJs the id of the meetup in order to let NextJs know which meetup to update 
export async function getStaticProps(context){

    // in getStaticProps we don't get the req and res props directly instead we get teh params props from there we can get the data in URL 
    // here we use meetupId because we have this identifier in the folder name for dynamic routing 
    // this is not pregenerated when the user visits the page with a specific value in the URL , but during the build process 
    // here we have to pre-generate the id because if user go the page than they will see an 404 error because this id will be not valid in first that's why we use getStaticPaths function in order to get access the url when visits the page with specific URL 
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://om_db_user:om2411@cluster0.5ntp767.mongodb.net/meetups?appName=Cluster0');
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const selectedMeetup = await meetupCollection.findOne({ _id: new ObjectId(meetupId)})

    client.close();

    return {
        props : {
            meetupData : {
                id : selectedMeetup._id.toString(),
                title : selectedMeetup.title,
                address : selectedMeetup.address ,
                image : selectedMeetup.image ,
                description : selectedMeetup.description ,

            } , 
        }
    };
}