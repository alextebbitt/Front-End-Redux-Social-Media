import React, { useState, useEffect } from "react";

import userpic2 from "../../assets/userpic2.png";

import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";
import Post from "../Home/Posts/Post";
import EditModel from "../Home/Posts/EditModel/EditModel";
import CommentModel from "../Home/Posts/CommentModel/CommentModel";
import {
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
  EditOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { notification } from "antd";
import {
  deletePost,
  getById,
  like,
  unLike,
  reset,
} from "../../features/posts/postsSlice";
import "./Profile.scss";
import { getInfo } from "../../features/auth/authSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { posts, message, isSuccess, isError } = useSelector(
    (state) => state.posts
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  console.log("hello", user.user.postIds);
  const mapUser = user.user.postIds;
  const dispatch = useDispatch();
  const API_URL = "http://localhost:8787/"; //"https://social-media-redux.herokuapp.com/"
  useEffect(() => {
    dispatch(getInfo());
  }, [posts]);

  const showModal = (_id) => {
    dispatch(getById(_id));
    setIsModalVisible(true);
  };

  const showModalComment = (_id) => {
    dispatch(getById(_id));
    setIsModalVisible2(true);
  };

  if (!user) {
    return <Spin />;
  }
  // function filterByUserId (id) {
  //   return id.userId._id === user.user._id;
  // }

  // const filteredPosts = posts.filter(filterByUserId);
  const post = mapUser.map((post) => {
    const isAlreadyLiked = post.likes?.includes(user?.user._id);
    return (
      <div className="container" key={post._id}>
        <div className="title-body-image">
          {post.image_path && (
            <div className="image">
              <img src={API_URL + post.image_path} alt="" />
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
        </div>
      </div>
    );
  });
  if (!user) {
    return <Spin />;
  }
  return (
    <div className="bigdiv">
      <h1 className="yourprofile">Your Profile</h1>
      <div className="selectfile">
        <img src={userpic2} alt="hhhhh" className="userpic-image" />
        <div className="upload-div">
          <label className="Select-a-file" for="myfile">
            Upload profile pic:
          </label>
          <input type="file" className="myfile" name="image" />
        </div>
        <div className="name-email">
          <p>Name: {user.user.name}</p>
          <p>Email: {user.user.email}</p>
          <p>Role: {user?.user.role}</p>
          <p>Number of Posts: {user?.user.postIds.length}</p>
          <p>Followers: {user?.user.followers.length}</p>
          <p>Following: {user?.user.following.length}</p>
          <p>Liked posts: {user?.user.favourites.length}</p>
        </div>
      </div>

      <div className="posts">
        <h2 className="yourposts">Your posts:</h2>
        {post}
        <EditModel visible={isModalVisible} setVisible={setIsModalVisible} />
        <CommentModel
          isModalVisible={isModalVisible2}
          setIsModalVisible={setIsModalVisible2}
        />
      </div>
    </div>
  );
};

export default Profile;
