import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { getAll, reset } from "../../../features/posts/postsSlice";
import { Spin } from "antd";



const Posts = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.posts);

  const getPostsAndReset = async () => {
    await dispatch(getAll());
    await dispatch(reset());
  };
  useEffect(() => {
    getPostsAndReset();
  }, []);
  if (isLoading) {
    return (
        <Spin />
    );
  }
  return (
    <div>
      Posts
      <Post />
    </div>
  );
};

export default Posts;