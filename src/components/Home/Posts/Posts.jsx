import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { getAll, reset } from "../../../features/posts/postsSlice";
import { Spin } from "antd";
import { getInfo } from "../../../features/auth/authSlice";
import "./Posts.scss";



const Posts = () => {
  const dispatch = useDispatch();
  const { isLoading, posts } = useSelector((state) => state.posts);

  const getPostsAndReset = async () => {
    await dispatch(getAll());
    await dispatch(reset());
  };
  useEffect(() => {
    getPostsAndReset();
  }, []);

  useEffect(() => {
    dispatch(getInfo());
  }, []);
  if (isLoading) {
    return (
        <Spin />
    );
  }
  return (
    <div className="posts">
      Posts
      <Post />
    </div>
  );
};

export default Posts;
