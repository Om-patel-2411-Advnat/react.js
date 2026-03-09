import { MongoClient } from 'mongodb';
import Head from 'next/head';

// import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList.js';


// const DUMMY_MEETUP = [
//     {
//         id:'m1',
//         title : 'A first Meetup',
//         image: 'https://www.universalweather.com/blog/wp-content/uploads/2019/07/tokyo-ops-7-19.jpg',
//         address : '5 ,street,district,state',
//         description : 'This is a first meet up',
//     },
//     {
//         id:'m2',
//         title : 'A second Meetup',
//         image: 'https://www.universalweather.com/blog/wp-content/uploads/2019/07/tokyo-ops-7-19.jpg',
//         address : '15 ,street,district,state',
//         description : 'This is a second meet up',
//     }
// ];

export default function HomePage(props){

    // now here we don't need state and Effect hooks because we are managing it using static generation
    // const [loadedMeetup , setLoadedMeetup] = useState([]);

    // // this function will render after this component function is done rendering so at first this loadedMeetup state will be empty and this will throw error that's why we set the empty array for initial value 
    // // and when this effect function executes it will update the state and this component will execute again
    // // here we have a problem due this duel render cycle and the problem is there will be no HTML data on the browser when the page is render the data is missing so we have to solve it first 
    // useEffect(()=>{
    //     setLoadedMeetup(DUMMY_MEETUP);
    // },[])

    return(
        <>
            {/* here inside of this Head element we can enter the title and description */}
            <Head>
                <title> React Meetups </title>
                <meta name='description' content='Browse a list of highly active meetups!!'/>
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    )
}


// static generation of re-rendering 
// when you use static generation page component is pre-rendered when you build your application , when you build the next project means you build it for production 
// with static generation by default your page is not pre-rendered on the fly on the server when the request reaches the server but instead it is pre-rendered when we build your site for production. that means that after it was deployed , that pre-rendered page does not change at least not by default, if you then update the data and you know that the pre-rendered page needs to change you need to start that build process again and redeploy again 

// solution 1]
// if you need to add data fetching to a page component , you can do so by adding a special function which only works in your page component files not in other component files , only in component files inside of the pages folder 
// the name of the function should be getStaticProps (this is mandatory).
// the name is important because next js will look for this function and if it finds it it will executes it during this pre-rendering process, so it will not directly call your component function and use the returned JSX snapshot as HTML content but it will first of all , call getStaticProps before it call the component function 
// it has this name getStaticProps because it prepares props for this component page and those props contains the data this page needs and it's allowed to be async function 
// after doing this your component will have data  when it renders 
// here you can add any code that you want to run on server you can access the file system o access the database here
// this code will never be executes on the client side it will only render on the server side 
// this function is used if we wan to fetch or update the data after som specific time interval 
export async function getStaticProps(){
    
    const client = await MongoClient.connect('mongodb+srv://om_db_user:om2411@cluster0.5ntp767.mongodb.net/meetups?appName=Cluster0');
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();

    client.close();

    // you have to set a props properties here and it has to be named as props and it also holds another object which will be th prop object that we will receive in you component function 
    return {
        props : {
            meetups : meetups.map(meetup=>({
                title : meetup.title ,
                address : meetup.address ,
                image : meetup.image,
                id : meetup._id.toString(),   
            })),
        },
        // now if the data is changed frequently than we have to add this property 
        // when we add this property we unlock a new feature called incremental static generation
        // it wants a number , and this number is the number of the seconds NextJs will wait until it's regenerates this page for an incoming request 
        // if we sen the number to 10 than this component would be regenerate on the server at least every 10 seconds if there are requests coming in for this page and than this regenerated pages would replace the old pages 
        revalidate : 10 , // seconds
    };
}


// we are not using this solution because we don't have to change data frequently in this project so we use getStaticProps instead of getServerSideProps
// solution 2]
// if you want to update the data dynamically means not dependent on any specific time but when ever any new request come you want to update the data so you can use this alternative approach getServerSideProps.
// getServerSideProps this is reserved name which nextJs will be looking for 
// this function will not run during the build process , but instead always on the server after deployment
// here you can receive a context prop which you can also get in getStaticProps 
// export async function getServerSideProps(context){

//     // by using this you can access the req and response 
//     // this works like middleware into the node and express js
//     const req = context.req;
//     const res = context.res;

//     // fetch data 

//     // this function will re-execute the component function whenever the new request comes so here we don't need any revalidate method here
//     return {
//         props : {
//             meetups : DUMMY_MEETUP
//         },
//     };
// }   