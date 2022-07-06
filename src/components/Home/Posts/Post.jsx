import { useSelector, useDispatch } from "react-redux";
import { deletePost, like, unLike, updatePost } from "../../../features/posts/postsSlice";
import { HeartOutlined, HeartFilled, DeleteOutlined, EditOutlined  } from "@ant-design/icons";
import "./Post.css";

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
const { user } = useSelector((state) => state.auth);
const dispatch = useDispatch();
 
const author =  user.user.postIds
console.log(" 111111", author)

const post = posts.map((post) => {
    const isAlreadyLiked = post.likes?.includes(user?.user._id);
    
    

    return (
      <div className="Product" key={post._id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
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
    );
  });

  return <div>{post}</div>;
};

export default Post;
