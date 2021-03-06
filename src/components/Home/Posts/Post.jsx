import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePost,
  getById,
  like,
  unLike,
  updatePost,
  reset,
  comment,
} from "../../../features/posts/postsSlice";
import {
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
  EditOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import "./Post.scss";
import EditModel from "./EditModel/EditModel";
import CommentModel from "./CommentModel/CommentModel";
import { notification } from "antd";
import { createAction } from "@reduxjs/toolkit";
const Post = () => {
  const { posts, message, isSuccess, isError } = useSelector(
    (state) => state.posts
  );
  const { user } = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const dispatch = useDispatch();
  const API_URL = "http://localhost:8787/"; // "https://social-media-redux.herokuapp.com/"
    // const author = user.user.postIds;

    useEffect(() => {
      if (isError) {
        notification.error({ message: "Error", description: message });
      }
      if (isSuccess) {
        notification.success({ message: "Success", description: message });
      }
      dispatch(reset());
    }, [message, isError, isSuccess]);

  const showModal = (_id) => {
    dispatch(getById(_id));
    setIsModalVisible(true);
  };

  const showModalComment = (_id) => {
    dispatch(getById(_id));
    setIsModalVisible2(true);
  };

  const post = posts.map((post) => {
    const isAlreadyLiked = post.likes?.includes(user?.user._id);

    return (
      <div className="container" key={post._id}>
        <div className="title-body-image">
          {post.image_path && (
            <div className="image">
              <img className="imagepost" src={API_URL + post.image_path} alt="" />
            </div>
          )}
          <div className="title-body">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        </div>

        <div className="delete-edit-like">
          <MessageOutlined onClick={() => showModalComment(post._id)} />
          <DeleteOutlined onClick={() => dispatch(deletePost(post._id))} />
          <EditOutlined onClick={() => showModal(post._id)} />
          <span className="wish">likes: {post.likes?.length}</span>
          {isAlreadyLiked ? (
            <HeartFilled onClick={() => dispatch(unLike(post._id))} />
          ) : (
            <HeartOutlined onClick={() => dispatch(like(post._id))} />
          )}
          {/* {author.includes(post._id) ? (
          <DeleteOutlined onClick={() => dispatch(deletePost(post._id))} />
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
      <CommentModel
        isModalVisible={isModalVisible2}
        setIsModalVisible={setIsModalVisible2}
      />
    </div>
  );
};

export default Post;
