import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "preact/hooks";
import { db } from "../../firebase";

export default function DeleteModal({
  postId,
  setShowDeleteModal,
  setPostsContext,
}) {
  const [loading, setLoading] = useState(false);

  async function deletePost() {
    setLoading(true);

    await deleteDoc(doc(db, "posts", postId));

    setPostsContext((prevPosts) => [
      ...prevPosts.filter((post) => post.id !== postId),
    ]);
    setShowDeleteModal(false);
    setLoading(false);
  }

  return (
    <div className="overlay">
      <div className="card">
        <h3>Are you sure you want to delete this post</h3>
        <div className="flex">
          <button disabled={loading} onClick={deletePost}>
            Sure
          </button>
          <button
            disabled={loading}
            className="cancel"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
