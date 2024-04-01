import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function PostDetail() {
  const [postDetail, setPostDetail] = useState({});
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: "", message: "" });

  async function fetchPostDetails() {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`);
      const jsonData = await response.json();
      setPostDetail(jsonData.post);
    } catch (err) {
      console.log(err);
    }
  }

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await response.json();
      setFormData({ name: "", message: "" });
      await fetchPostDetails();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
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
      <h2>Write a comment!:</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <label htmlFor="message">Message:</label>
        <input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default PostDetail;
