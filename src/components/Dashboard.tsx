import { Fragment, h } from 'preact'
import { useContext, useState } from "preact/hooks";
import { PostsContext } from "../PostsContext";
import AddModal from "../components/AddModal";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";

export type Post = {
  id: string;
  title: string;
  description: string
}

export default function Dashboard({ route, setRoute }:{route: string, setRoute: any}) {
  const [postsContext, setPostsContext] = useContext<any>(PostsContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postId, setPostId] = useState("");
  const [toBeUpdatedPostData, setToBeUpdatedPostData] = useState({});

  function handleShowEdit(id: string, postTitle: string, postDescription: string) {
    setToBeUpdatedPostData({
      title: postTitle,
      description: postDescription,
    });
    setPostId(id);
    setShowEditModal(true);
  }

  function handleShowDelete(id: string) {
    setPostId(id);
    setShowDeleteModal(true);
  }

  return (
    <>
      <header>
        <h1>Dashboard</h1>
        <div className="page-link" onClick={() => setRoute("/")}>
          Posts
        </div>
      </header>

      <main>
        <button className="add-post" onClick={() => setShowAddModal(true)}>
          Create Post
        </button>
        <div className="posts">
          {postsContext.map((post: Post) => (
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
            <div className="no-posts">
              <span>No posts were found! Go ahead and add one</span>
            </div>
          )}
        </div>
      </main>

      {showAddModal && (
        <AddModal
          setShowAddModal={setShowAddModal}
          setPostsContext={setPostsContext}
        />
      )}
      {showEditModal && (
        <EditModal
          postId={postId}
          setShowEditModal={setShowEditModal}
          postData={toBeUpdatedPostData}
          setPostsContext={setPostsContext}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          postId={postId}
          setShowDeleteModal={setShowDeleteModal}
          setPostsContext={setPostsContext}
        />
      )}
    </>
  );
}
