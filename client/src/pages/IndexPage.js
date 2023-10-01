import { useEffect, useState } from "react";
import Post from "../post";
export default function IndexPage(){
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        const response=fetch('http://localhost:5000/post').then(
            response=>{
                response.json().then(posts=>{
                    setPosts(posts);
                });
            });
    },[]);
    return(
        <>
        {posts.length && posts.map(post=>(
            <Post {...post}/>
        ))}
        </>
    );
}