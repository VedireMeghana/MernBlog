import { useContext, useEffect, useState } from "react";
import { Link,Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";


export default function Header() {
  const {setUserInfo,userInfo}=useContext(UserContext);
  const [redirect,setRedirect]=useState(false);
  useEffect(()=>{
    fetch('http://localhost:5000/profile',{
      credentials:'include',
    }).then(response=>{
      response.json().then(
        userInfo=>{
          setUserInfo(userInfo);
        }
      )
    })
  },[]);

  function logout(){
    fetch('http://localhost:5000/logout',{
      credentials:'include',
      method:'POST',
    });
    setUserInfo(null);
    setRedirect(true);
  }
  if(redirect){
    return <Navigate to={'/logout'}/>
  }
  const username=userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        MYBLOG
      </Link>
      <nav>
        {username && (
          <>
          <Link to='/create'>Create New Post</Link>
          <a href='' onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (<>
          <Link to="/login">LOGIN</Link>
            <Link to="/register ">REGISTER</Link>
        </>)}
      </nav>
    </header>
  );
}
