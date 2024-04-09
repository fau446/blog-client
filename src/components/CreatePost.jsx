import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    published: false,
  });
  const [errors, setErrors] = useState([]);

  function handleInputChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token)
        setErrors("Authentication Token does not exist. Please log in again.");

      const response = await fetch("http://localhost:3000/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const jsonData = await response.json();
      if (jsonData.errors) {
        setErrors(jsonData.errors);
        return;
      } else if (jsonData.error) {
        setErrors([{ msg: jsonData.error }]);
        return;
      }

      navigate("/");
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <>
      <Link to="/">Home Page</Link>
      <h1>Create Post</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <label htmlFor="content">Content: </label>
        <textarea
          name="content"
          id="content"
          value={formData.content}
          onChange={handleInputChange}
          cols="30"
          rows="3"
        ></textarea>
        <label htmlFor="published">Publish? </label>
        <input
          type="checkbox"
          name="published"
          id="published"
          checked={formData.published}
          onChange={handleInputChange}
        />
        <button>Create Post</button>
      </form>
      {errors.map((error, index) => (
        <p key={index}>{error.msg}</p>
      ))}
    </>
  );
}

export default CreatePost;
