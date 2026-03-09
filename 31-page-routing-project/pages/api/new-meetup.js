// here you can not create React component function 
// this API routes are not about defining , rendering or returning React components instead here we will define functions which contains server-side code because this will only run on server never on the client decoding them will be never be exposed to the client 
// this will be triggered when ever the api route is triggered like this for this file " api/new-meetup "

import { MongoClient } from 'mongodb'

export default async function handler(req , res){
    // req is needed for incoming request & res is needed for sending back the response 
    // by the req object we can get the header or body of the request 
    if(req.method === 'POST'){
        const data = req.body; 

        const { title , image , address , description } = data;

        const client = await MongoClient.connect('mongodb+srv://om_db_user:om2411@cluster0.5ntp767.mongodb.net/meetups?appName=Cluster0');
        const db = client.db();

        const meetupCollection = db.collection('meetups');

        const result = await meetupCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message : 'Meetup inserted'});
    } 
}