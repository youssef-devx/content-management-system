import { render } from "preact";
import { App } from "./app";
import "./index.css";
import PostsContextPorivder from "./PostsContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PostsContextPorivder>
        <App />
      </PostsContextPorivder>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PostsContextPorivder>
        <Dashboard />
      </PostsContextPorivder>
    ),
  },
]);

render(<RouterProvider router={router} />, document.getElementById("app"));
