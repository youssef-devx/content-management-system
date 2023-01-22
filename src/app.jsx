import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "preact/hooks";
import "./app.css";
import { db } from "./firebase";
import { PostsContext } from "./PostsContext";
import Dashboard from "./components/Dashboard";

export function App() {
  const [loading, setLoading] = useState(true);
  const [postsContext, setPostsContext] = useContext(PostsContext);
  const [route, setRoute] = useState("/");

  useEffect(() => {
    async function fetchPosts() {
      const querySnapshot = await getDocs(collection(db, "posts"));

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setPostsContext((prevPosts) => [
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
    <div className="app">
      <header>
        <h1>Posts</h1>
        <div onClick={() => setRoute("dashboard")}>Dashabord</div>
      </header>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="posts">
          {postsContext.map((post) => (
            <div className="post" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          ))}
          {postsContext.length < 1 && (
            <div className="no-posts">
              No posts were found! Go ahead and add one
              <div onClick={() => setRoute("dashboard")}>Dashboard</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
