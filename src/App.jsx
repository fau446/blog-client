import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Post from "./components/Post";

function App({ isLoggedIn, setIsLoggedIn }) {
  const [posts, setPosts] = useState([]);

  function logOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  }

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

    async function fetchAllPosts() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/all-posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const jsonData = await response.json();
        console.log(jsonData);
        setPosts(jsonData.posts);
      } catch (err) {
        console.log(err);
      }
    }

    if (isLoggedIn) {
      fetchAllPosts();
    } else {
      fetchPosts();
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <a onClick={logOut}>Log Out</a>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <h1>Blog</h1>
      <h2>Published Posts</h2>
      {posts
        .filter((post) => post.published)
        .map((post, index) => (
          <Link key={index} to={"posts/" + post._id}>
            <div key={index}>
              <Post key={index} title={post.title} date={post.date} />
            </div>
          </Link>
        ))}
      {isLoggedIn && (
        <>
          <h2>Unpublished Posts</h2>
          {posts
            .filter((post) => !post.published)
            .map((post, index) => (
              <Link key={index} to={"posts/" + post._id}>
                <div key={index}>
                  <Post key={index} title={post.title} date={post.date} />
                </div>
              </Link>
            ))}
        </>
      )}
    </>
  );
}

export default App;
