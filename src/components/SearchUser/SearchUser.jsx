import React from 'react'
import { useEffect, useSelector } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserByName } from '../../features/auth/authSlice';

const SearchUser = () => {
    const { user } = useSelector((state) => state.auth);
    const { userName } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUserByName(userName));
    }, [userName]);

  return (
    <div className="name-email">
      <h2>Name: {userName.user.name}</h2>
      <h2>Email: {user.user.email}</h2>
    </div>
  );
}

export default SearchUser