import PostAdmin from "./PostAdmin/PostAdmin";
import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../features/posts/postsSlice";
import { useEffect } from "react";
import "./Admin.scss";

const Admin = () => {
  const { isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const getPostsAndReset = async () => {
    await dispatch(getAll());
    dispatch(reset());
  };
  useEffect(() => {
    getPostsAndReset();
  }, []);

  if (isLoading) {
    return <h1>Loading posts...</h1>;
  }
  return (
    <div className="container">
      <h1>Admin</h1>
      <div className="posts-admin">
        <PostAdmin />
      </div>
    </div>
  );
};

export default Admin;
