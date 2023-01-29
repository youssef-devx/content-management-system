import { addDoc, collection } from "firebase/firestore";
import { useState } from "preact/hooks";
import { db } from "../../firebase";

export default function AddModal({ setShowAddModal, setPostsContext }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function addPost(e) {
    e.preventDefault();

    const newPostData = {
      title,
      description,
    };
    const docRef = await addDoc(collection(db, "posts"), newPostData);

    setPostsContext((prevPosts) => [
      ...prevPosts,
      { ...newPostData, id: docRef._key.path.segments[1] },
    ]);
    setShowAddModal(false);
  }

  return (
    <div className="overlay">
      <div className="card">
        <form>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="description">Desscription:</label>
          <textarea
            name="description"
            rows="6"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          <div className="flex">
            <button
              disabled={loading || title.length < 1 || description.length < 1}
              onClick={(e) => addPost(e)}
            >
              Create
            </button>
            <button className="cancel" onClick={() => setShowAddModal(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
