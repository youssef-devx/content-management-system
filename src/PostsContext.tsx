import { createContext } from "preact";
import { useState } from "preact/hooks";

export const PostsContext = createContext([]);

export default function PostsContextPorivder({ children }) {
  const [posts, setPosts] = useState([]);

  return (
    <PostsContext.Provider value={[posts, setPosts]}>
      {children}
    </PostsContext.Provider>
  );
}
