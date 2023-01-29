import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "preact/hooks";
import "./app.css";
import { db } from "../firebase";
import { PostsContext } from "./PostsContext";
import Dashboard from "./components/Dashboard";
import { Fragment, h } from 'preact'

export function App() {
  const [loading, setLoading] = useState(true);
  const [postsContext, setPostsContext] = useContext<any>(PostsContext);
  const [route, setRoute] = useState("/");

  useEffect(() => {
    async function fetchPosts() {
      const querySnapshot = await getDocs(collection(db, "posts"));

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setPostsContext((prevPosts: any) => [
          ...prevPosts,
          { ...doc.data(), id: doc.id },
        ]);
      });
      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (route === "dashboard") {
    return <Dashboard route={route} setRoute={setRoute} />;
  }

  return (
    <>
      <header>
        <h1>CMS</h1>
        <div className="page-link" onClick={() => setRoute("dashboard")}>
          Dashabord
        </div>
      </header>

      <main>
        <h2>Posts</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          postsContext.length < 1 && (
            <div className="no-posts">
              No posts were found! Go ahead and add one
              <div className="page-link" onClick={() => setRoute("dashboard")}>
                Dashboard
              </div>
            </div>
          )
        )}
        <div className="posts">
          {postsContext.map((post: { id: any; title: any; description: any; }) => (
            <div className="post" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
