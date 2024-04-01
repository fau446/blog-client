import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Post from "./components/Post";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const jsonData = await response.json();
        setPosts(jsonData.posts);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPosts();
  }, []);

  return (
    <>
      <h1>Blog</h1>
      {posts.map((post, index) => (
        <Link key={index} to={"posts/" + post._id}>
          <div key={index}>
            <Post key={index} title={post.title} date={post.date} />
          </div>
        </Link>
      ))}
    </>
  );
}

export default App;
