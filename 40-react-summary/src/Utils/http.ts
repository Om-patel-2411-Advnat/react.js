import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export type newPostStructure = {
    body: string,
    author: string,
} ;
export type PostStructure = {
    id : string ,
    body: string,
    author: string,
} ;

export async function sendingData(postData : newPostStructure) : Promise<string>{
    const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(!response.ok){
        throw new Error("there is an error in sending the data")
    }
    const {message}:{message : string} = await response.json();
    return message;
}

export async function fetchPosts() : Promise<PostStructure[]>{
    const response = await fetch('http://localhost:8080/posts');
    const data = await response.json();

    return data.posts
}

export async function fetchPostDetails(id : string) : Promise<PostStructure>{
    const response = await fetch(`http://localhost:8080/posts/${id}`);
    const data = await response.json();

    return data.post;
}