import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import PostDetail from "./components/PostDetail";
import Login from "./components/Login";

function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function verifyLogin() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:3000/verify-login", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const jsonData = await response.json();
        if (!jsonData.error) setIsLoggedIn(true);
      } catch (err) {
        console.log(err);
      }
    }

    verifyLogin();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
    },
    {
      path: "posts/:id",
      element: <PostDetail />,
    },
    {
      path: "login",
      element: <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
