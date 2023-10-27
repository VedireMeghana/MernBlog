import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

export default function PostPage() {
  const [postInfo, setpostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setpostInfo(postInfo);
      });
    });
  }, []);
    const handleDeletePost = () => {
    // Make an API request to delete the post on the server
    fetch(`http://localhost:5000/post/${id}`, {
      method: "DELETE",
      credentials:'include'
    })
      .then((response) => {
        if (response.ok) {
          // Post deleted successfully, navigate to the IndexPage
          // history.push("/index");
           navigate('/index')
         
        } else {
          // Handle error here, e.g., show an alert
          alert("Failed to delete the post.");
        }
      })
      .catch((error) => {
        // Handle any network or other errors
        console.error("Error deleting post:", error);
      });
  };
  if (postInfo === null) return "";
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit">
          <Link to={`/edit/${postInfo._id}`} className="edit-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit this post
          </Link>
          <br></br>
          <br></br>
          <button onClick={handleDeletePost} className="delete-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
            Delete this post
        </button>
        </div>
      )}


      <div className="image">
        <img src={`http://localhost:5000/${postInfo.cover}`} alt="" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
}
