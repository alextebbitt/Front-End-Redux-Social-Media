import { useDispatch, useSelector } from "react-redux";

import { deletePost } from "../../../features/posts/postsSlice";
 const API_URL = "http://localhost:8787/";
const PostAdmin = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const post = posts.map((post) => {
    return (
      <div className="post" key={post._id}>
        <p>{post.title}</p>
        <p>{post.body}</p>

        <button onClick={() => dispatch(deletePost(post._id))}>X</button>
        <div className="image">
          <img src={API_URL + post.image_path} alt="" />
        </div>
      </div>
    );
  });

  return <div>{post}</div>;
};

export default PostAdmin;
