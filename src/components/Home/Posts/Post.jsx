import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { like } from "../../../features/posts/postsSlice";

import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
const { user } = useSelector((state) => state.auth);
const dispatch = useDispatch();
 
const post = posts.map((post) => {
    const isAlreadyLiked = post.likes?.includes(user?.user._id);
    console.log(post)
    return (
      <div className="Product" key={post._id}>
        <p>{post.title}</p>
        <span className="wish">likes: {post.likes?.length}</span>
        {isAlreadyLiked ? (
          <HeartFilled onClick={() => console.log("dislike")} />
        ) : (
          <HeartOutlined onClick={() => dispatch(like(post._id))} />
        )}
      </div>
    );
  });

  return <div>{post}</div>;
};

export default Post;
