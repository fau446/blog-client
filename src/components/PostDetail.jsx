import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function PostDetail() {
  const [postDetail, setPostDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchPostDetails() {
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        const jsonData = await response.json();
        setPostDetail(jsonData.post);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPostDetails();
  }, []);

  return (
    <div>
      <Link to="/">Home Page</Link>
      <h1>{postDetail.title}</h1>
      <p>{postDetail.date}</p>
      <p>{postDetail.content}</p>
      <h2>Comments:</h2>
      {postDetail.comments &&
        postDetail.comments.map((comment, index) => (
          <div key={index}>
            <h3>{comment.name}</h3>
            <p>{comment.message}</p>
          </div>
        ))}
    </div>
  );
}

export default PostDetail;
