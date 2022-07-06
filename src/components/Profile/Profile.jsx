import { useSelector } from "react-redux";
import { Spin } from "antd";
import Post from "../Home/Posts/Post";
import { useEffect } from "react";

const Profile = () => {
  //  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  console.log(user.user);
  const userPost = user.user.postIds.map((postids) => {
    return (
      <p>
        {postids.title}
        {postids.body}
      </p>
    );
  });

  //  if (user.user_id === post.userId) {
  //    <div>{post}</div>;

  if (!user) {
    return <Spin />;
  }

  // useEffect(() => {
  //   post()

  //   return () => {

  //   }
  // }, [post])

  return (
    <div>
      <h1>Profile</h1>

      <p>{user.user.name}</p>
      <p>{user.user.email}</p>
      <div>{userPost}</div>
    </div>
  );
};

export default Profile;
