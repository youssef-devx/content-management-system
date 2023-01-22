import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useContext, useState } from "preact/hooks";
import { db } from "./firebase";
import { PostsContext } from "./PostsContext";

export default function Dashboard() {
  const [postsContext, setPostsContext] = useContext(PostsContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postId, setPostId] = useState("");
  const [toBeUpdatedPostData, setToBeUpdatedPostData] = useState({});

  function handleShowEdit(id, postTitle, postDescription) {
    setToBeUpdatedPostData({
      title: postTitle,
      description: postDescription,
    });
    setPostId(id);
    setShowEditModal(true);
  }

  function handleShowDelete(id) {
    setPostId(id);
    setShowDeleteModal(true);
  }

  return (
    <div>
      <header>
        <h1>Dashboard</h1>
        <a href="/">Posts</a>
      </header>

      <button className="add-post" onClick={() => setShowAddModal(true)}>
        Create Post
      </button>
      <div className="posts">
        {postsContext.map((post) => (
          <div className="post" key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <div className="flex">
              <button
                className="edit"
                onClick={() =>
                  handleShowEdit(post.id, post.title, post.description)
                }
              >
                Edit
              </button>
              <button
                className="delete"
                onClick={() => handleShowDelete(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {postsContext.length < 1 && (
          <div className="no-posts">No posts were found!</div>
        )}
      </div>

      {showAddModal && (
        <AddModal postId={postId} setShowAddModal={setShowAddModal} />
      )}
      {showEditModal && (
        <EditModal
          postId={postId}
          setShowEditModal={setShowEditModal}
          postData={toBeUpdatedPostData}
        />
      )}
      {showDeleteModal && (
        <DeleteModal postId={postId} setShowDeleteModal={setShowDeleteModal} />
      )}
    </div>
  );
}

export function AddModal({ postId, setShowAddModal }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function addPost(e) {
    e.preventDefault();

    const newData = {
      title,
      description,
    };
    const docRef = await addDoc(collection(db, "posts"), newData);
    console.log(docRef, "added");
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
          <button onClick={(e) => addPost(e)}>Create</button>
          <button onClick={() => setShowAddModal(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export function EditModal({ postId, setShowEditModal, postData }) {
  const [title, setTitle] = useState(postData.title);
  const [description, setDescription] = useState(postData.description);
  console.log(postId, "edit");
  async function editPost(e) {
    e.preventDefault();

    const newData = {
      title,
      description,
    };
    const docRef = await updateDoc(doc(db, "posts", postId), newData);
    console.log(docRef, "updated");
    setShowEditModal(false);
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
          <button onClick={(e) => editPost(e)}>Edit</button>
          <button onClick={() => setShowEditModal(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export function DeleteModal({ postId, setShowDeleteModal }) {
  console.log(postId, "delete");
  async function deletePost() {
    const docRef = await deleteDoc(doc(db, "posts", postId));
    console.log(docRef, "deleted");
    setShowDeleteModal(false);
  }

  return (
    <div className="overlay">
      <div className="card">
        <h1>Are you sure you want to delete this post</h1>
        <button onClick={deletePost}>Sure</button>
        <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
      </div>
    </div>
  );
}
