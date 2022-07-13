import React from 'react'
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByName, follow, unFollow, reset } from '../../features/auth/authSlice';
import { notification } from "antd";
import userpic2 from "../../assets/userpic2.png";
import "./SearchUser.scss";
const SearchUser = () => {
    const { user } = useSelector((state) => state.auth);
    const { isError, isSuccess, message } = useSelector((state) => state.auth);
    const { userName } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
      if (isError) {
        notification.error({ message: "Error", description: message });
      }
      
      if (isSuccess) {
        notification.success({ message: "Success", description: message });
      }
      dispatch(getUserByName(userName));
      dispatch(reset())
    }, [ isError, isSuccess, message]);

useEffect(() => {
  
  dispatch(getUserByName(userName))
}, [user])


  return (
    <div>
      <h1 className="nameattop">{user?.user.name}</h1>
      <div className="details-pic">
        <div className="user-details">
          <h2>{user?.user.name}</h2>
          <h4>Email: {user?.user.email}</h4>
          <h4>Role: {user?.user.role}</h4>
          <h4>Number of Posts: {user?.user.postIds.length}</h4>
          <h4>Followers: {user?.user.followers.length}</h4>
          <h4>Following: {user?.user.following.length}</h4>
          <h4>Liked posts: {user?.user.favourites.length}</h4>
        </div>
        <div className="image-searchuser">
          <img src={userpic2} alt="hhhhh" className="userpic-image" />
          <div className="buttons-follow">
            <button
              className="follow"
              onClick={() => dispatch(follow(user.user._id))}
            >
              Follow{" "}
            </button>
            <button
              className="unfollow"
              onClick={() => dispatch(unFollow(user.user._id))}
            >
              Unfollow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchUser