import { useSelector, useDispatch } from "react-redux";
import {
  deletePost,
  like,
  unLike,
  updatePost,
} from "../../../features/posts/postsSlice";
import {
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./Post.scss";

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const API_URL = "http://localhost:8787/";

  const author = user.user.postIds;

  const post = posts.map((post) => {
    const isAlreadyLiked = post.likes?.includes(user?.user._id);

    return (
      <div className="container" key={post._id}>
        <div className="title-body-image">
          <div className="title-body">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
           
          </div>

          {console.log(API_URL + "imagesmulter/" + post.image_path)}
          <div className="image">
            <img src={API_URL + post.image_path} alt="" />
          </div>
        </div>
        <div className="delete-edit-like">
          <button onClick={() => dispatch(deletePost(post._id))}>
            <DeleteOutlined />
          </button>
          <button onClick={() => dispatch(updatePost(post._id))}>
            <EditOutlined />
          </button>
          <span className="wish">likes: {post.likes?.length}</span>
          {isAlreadyLiked ? (
            <HeartFilled onClick={() => dispatch(unLike(post._id))} />
          ) : (
            <HeartOutlined onClick={() => dispatch(like(post._id))} />
          )}
          {/* {author.includes(post._id) ? (
          <button onClick={() => dispatch(deletePost(post._id))}>X</button>
        ) : null} */}
          {/* {author.includes(post._id) ? (
          <button onClick={() => dispatch(updatePost(post._id))}>
            EditPost
          </button>
        ) : null} */}
        </div>
      </div>
    );
  });

  return <div className="post">{post}</div>;
};

export default Post;
