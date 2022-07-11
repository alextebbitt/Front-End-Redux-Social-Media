import React from 'react'
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByName } from '../../features/auth/authSlice';

const SearchUser = () => {
    const { user } = useSelector((state) => state.auth);
    console.log(user)
    const { userName } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUserByName(userName));
    }, [userName]);

  return (
    <div className="name-email">
      <h2>Name: {user?.user.name}</h2>
      <h2>Email: {user?.user.email}</h2>
      <h2>Role: {user?.user.role}</h2>
      <h2>Number of Posts: {user?.user.postIds.length}</h2>
      <h2>Followers: {user?.user.followers.length}</h2>
      <h2>Following: {user?.user.following.length}</h2>
      <h2>Liked posts: {user?.user.favourites.length}</h2>
    </div>
  );
}

export default SearchUser