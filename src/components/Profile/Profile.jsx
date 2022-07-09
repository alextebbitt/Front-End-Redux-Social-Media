import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";
import Post from "../Home/Posts/Post";
import {
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  deletePost,
  getById,
  like,
  unLike,
  updatePost,
} from "../../features/posts/postsSlice";
import "./Profile.scss";
const API_URL = "http://localhost:8787/";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
var posts = useSelector((state) => state.posts);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
   const API_URL = "http://localhost:8787/";

 const showModal = (_id) => {
   dispatch(getById(_id));
   setIsModalVisible(true);
 };

 posts = user.user.postIds;
//  const userPost = user.user.postIds.map((post) => {})
  
  if (!user) {
    return <Spin />;
  }

  return (
    <div>
      <h1 className="yourprofile">Your Profile</h1>
      <div className="name-email">
        <h2>Name: {user.user.name}</h2>
        <h2>Email: {user.user.email}</h2>
      </div>

      <div className="posts">
        <h2 className="yourposts">Your posts:</h2>
        <Post/>
      </div>
    </div>
  );
};

export default Profile;
