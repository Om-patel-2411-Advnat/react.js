import { useQuery } from "@tanstack/react-query";
import PostList from "../components/PostList.jsx";
import { Outlet } from "react-router-dom";
import { fetchPosts } from "../Utils/http.js";


export default function Posts() {

  const {data , isLoading , isError} = useQuery({
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

