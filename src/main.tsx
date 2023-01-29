import { render, h } from "preact";
import { App } from "./app";
import "./index.css";
import PostsContextPorivder from "./PostsContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <PostsContextPorivder>
//         <App />
//       </PostsContextPorivder>
//     ),
//   },
//   {
//     path: "/dashboard",
//     element: (
//       <PostsContextPorivder>
//         <Dashboard route={""} setRoute={undefined} />
//       </PostsContextPorivder>
//     ),
//   },
// ]);

const appEl = document.getElementById("app")
if(appEl) render(<PostsContextPorivder><App /></PostsContextPorivder>, appEl)
