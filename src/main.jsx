import { render } from "preact";
import { App } from "./app";
import "./index.css";
import PostsContextPorivder from "./PostsContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

render(
  <PostsContextPorivder>
    <App />
  </PostsContextPorivder>,
  document.getElementById("app")
);
