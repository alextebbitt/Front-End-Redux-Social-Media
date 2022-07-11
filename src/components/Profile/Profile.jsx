import React, { useState, useEffect } from "react";
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
  updatePost,
  reset
} from "../../features/posts/postsSlice";
import "./Profile.scss";

const Profile = () => {
 
  const { user } = useSelector((state) => state.auth);
 const { posts, message, isSuccess, isError } = useSelector(
   (state) => state.posts
 );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const dispatch = useDispatch();
   const API_URL = "http://localhost:8787/";


    // useEffect(() => {
    //   dispatch(reset());
    //   if (isError) {
    //     notification.error({ message: "Error", description: message });
    //   }
    //   if (isSuccess) {
    //     notification.success({ message: "Success", description: message });
    //   }
    // }, [message, isError, isSuccess]);

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
function filterByUserId (id) {
  return id.userId._id === user.user._id; 
}

const filteredPosts = posts.filter(filterByUserId);
const post = filteredPosts.map((post) => {
  debugger;
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
    <div>
      <h1 className="yourprofile">Your Profile</h1>
      <div className="name-email">
        <h2>Name: {user.user.name}</h2>
        <h2>Email: {user.user.email}</h2>
        <h2>Role: {user?.user.role}</h2>
        <h2>Number of Posts: {user?.user.postIds.length}</h2>
        <h2>Followers: {user?.user.followers.length}</h2>
        <h2>Following: {user?.user.following.length}</h2>
        <h2>Liked posts: {user?.user.favourites.length}</h2>
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
