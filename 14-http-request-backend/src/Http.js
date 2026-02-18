export async function HandleFetchPlaces(){
    const response = await fetch('http://localhost:3000/places');
    const data  = await response.json();
    
    // here while fteching the data we might get the error so we have to handle the error also 
    // this will give true if we get the data and get the successful response like 200 or 300
    // if(response.ok)
    // this will give true if we get the data and get the error response like 400 or 500 
    if(!response.ok){
        throw new Error('Failed to fetch places');
    }

    return data.places ;

}
export async function HandleUserPlaces(){
    const response = await fetch('http://localhost:3000/user-places');
    const data  = await response.json();
    
    // here while fteching the data we might get the error so we have to handle the error also 
    // this will give true if we get the data and get the successful response like 200 or 300
    // if(response.ok)
    // this will give true if we get the data and get the error response like 400 or 500 
    if(!response.ok){
        throw new Error('Failed to fetch user places');
    }

    return data.places ;

}

export async function updateUserPlaces(places){
    // fetch has one more argument in which we can decide the method and the body that is going to be sended like given below
    const response = await fetch('http://localhost:3000/user-places' ,{
        method : 'PUT',
        // we are using { places } because in the backend we are expecting an object not an array 
        body : JSON.stringify({ places }),
        headers : {
            'content-type' : 'application/json'
        }
    });

    if(!response.ok){
        throw new Error('Failed to Update user Data ...');
    }

    const data = await response.json();

    return data.message ;
}