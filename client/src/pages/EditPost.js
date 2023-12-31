import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import { Navigate, useParams } from "react-router-dom";

export default function EditPost(){
    const {id}=useParams();
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [files,setFiles]=useState('');
   // const [cover,setCover]=useState('');
    const [redirect,setRedirect]=useState(false);

    useEffect(()=>{
        fetch('http://localhost:5000/post/'+id)
        .then(response=>{
            response.json().then(postInfo=>{
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);

            });
        });
    },[]);
    async function updatePost(e){
        e.preventDefault();
        const data=new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id);
        if(files?.[0]){
            data.set('file',files?.[0]);
        }

        const response=await fetch('http://localhost:5000/post',{
            method:'PUT',
            body:data,
            credentials:'include',
        });
        if(response.ok){
            setRedirect(true);
        }

    }
    if(redirect){
        return <Navigate to={'/post/'+id}/>
    }
    return(
        <form onSubmit={updatePost}>
            <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}></input>
            <input type="summary" placeholder="Summary" value={summary} onChange={e=>setSummary(e.target.value)}></input>
            <input type="file" onChange={e=>setFiles(e.target.files)}></input>
            <ReactQuill value={content} onChange={newValue=>setContent(newValue)}/>
            <button style={{marginTop:'8px'}}>Update post</button>
        </form>
    );
}