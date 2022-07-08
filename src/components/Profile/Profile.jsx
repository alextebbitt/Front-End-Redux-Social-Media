import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";
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
  const { post } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const userPost = user.user.postIds.map((postids) => {
    const isAlreadyLiked = post.likes?.includes(user?.user._id);

    const showModal = (_id) => {
      dispatch(getById(_id));
      setIsModalVisible(true);
    };

    return (
      <div className="containerposts">
        <div className="title-and-posts">
          <h2>{postids.title}</h2>
          <p>{postids.body}</p>
        </div>
        <div className="image">
          <img src={API_URL + post.image_path} alt="" />
        </div>
        <div className="delete-edit-like">
          <DeleteOutlined onClick={() => dispatch(deletePost(post._id))} />
          <EditOutlined onClick={() => showModal(updatePost.post._id)} />
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

  //  if (user.user_id === post.userId) {
  //    <div>{post}</div>;

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
        {userPost}
      </div>
    </div>
  );
};

export default Profile;
