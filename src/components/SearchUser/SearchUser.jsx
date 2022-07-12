import React from 'react'
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByName, follow, unFollow, reset } from '../../features/auth/authSlice';
import { notification } from "antd";
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
      
    }, [ isError, isSuccess, message]);

useEffect(() => {
  
  dispatch(getUserByName(userName))
}, [user])


  return (
    <div>
      <div className="name-email">
        <h2>Name: {user?.user.name}</h2>
        <h2>Email: {user?.user.email}</h2>
        <h2>Role: {user?.user.role}</h2>
        <h2>Number of Posts: {user?.user.postIds.length}</h2>
        <h2>Followers: {user?.user.followers.length}</h2>
        <h2>Following: {user?.user.following.length}</h2>
        <h2>Liked posts: {user?.user.favourites.length}</h2>
      </div>
      <div className='buttons-follow'>
        <button className='follow' onClick={() => dispatch(follow(user.user._id))}>Follow </button>
        <button className='unfollow' onClick={() => dispatch(unFollow(user.user._id))}>
          Unfollow
        </button>
      </div>
    </div>
  );
}

export default SearchUser