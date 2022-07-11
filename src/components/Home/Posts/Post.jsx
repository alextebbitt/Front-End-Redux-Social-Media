import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePost,
  getById,
  like,
  unLike,
  updatePost,
  reset
} from "../../../features/posts/postsSlice";
import {
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./Post.scss";
import EditModel from "./EditModel/EditModel";
import { notification } from "antd";
import { createAction } from "@reduxjs/toolkit";
const Post = () => {
  const { posts, message, isSuccess, isError } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const API_URL = "http://localhost:8787/";

  // const author = user.user.postIds;

useEffect(() => {
  if (isError) {
    notification.error({message: "Error", description: message});
  }
if (isSuccess) {
  notification.success({ message: "Success", description: message});
  
}
dispatch(reset());
}, [message, isError, isSuccess])


  const showModal = (_id) => {
    dispatch(getById(_id));
    setIsModalVisible(true);
  };

  const post = posts.map((post) => {
    console.log(post)
    const isAlreadyLiked = post.likes?.includes(user?.user._id);

    return (
      <div className="container" key={post._id}>
        <div className="title-body-image">
          {post.image_path && 
            <div className="image">
              <img src={API_URL + post.image_path} alt="" />
            </div>
          }
          <div className="title-body">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        </div>

        <div className="delete-edit-like">
          <DeleteOutlined onClick={() => dispatch(deletePost(post._id))} />
          <EditOutlined onClick={() => showModal(post._id)} />
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

  return (
    <div className="post">
      {post}
      <EditModel visible={isModalVisible} setVisible={setIsModalVisible} />
    </div>
  );
};

export default Post;
