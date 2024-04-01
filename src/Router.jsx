import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import PostDetail from "./components/PostDetail";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "posts/:id",
      element: <PostDetail />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
