import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

import PostList from "../components/PostList";
import { fetchPosts } from "../Utils/http";
import { PostStructure } from '../Utils/http';


export default function Posts (){

  const {data , isLoading , isError} = useQuery<PostStructure[]>({
    queryKey : ['posts'],
    queryFn : fetchPosts ,
  })

  let content;

  if(isLoading){
    content = <p>Loading ...</p>
  }
  if(isError){
    content = <p>There is an error in fetching posts</p>
  }
  if(data){
    content = <PostList posts={data} />
  }

  return (
    <>
      <Outlet />
      <main>
        {content}
      </main>
    </>
  );
}

