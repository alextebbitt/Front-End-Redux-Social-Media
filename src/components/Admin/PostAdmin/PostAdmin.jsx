import { useDispatch, useSelector } from "react-redux";

import { deletePost } from "../../../features/posts/postsSlice";
 const API_URL = "http://localhost:8787/";
const PostAdmin = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const post = posts.map((post) => {
    return (
      <div className="post-admin" key={post._id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>

        <button onClick={() => dispatch(deletePost(post._id))}>Delete post</button>
        <div className="image-admin">
          <img src={API_URL + post.image_path} alt="" />
        </div>
      </div>
    );
  });

  return <div>{post}</div>;
};

export default PostAdmin;
