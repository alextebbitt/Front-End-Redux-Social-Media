import { useSelector } from "react-redux";
import { Spin } from "antd";
import Post from "../Home/Posts/Post";

const Profile = () => {
   const { posts } = useSelector((state) => state.posts);
   const { user } = useSelector((state) => state.auth);
   
  const post = posts.map((post) => {
    console.log(post)
    if (user.user_id === post.userId) {
      <div>{post}</div>;
    }
  if (!user) {
    return <Spin />;
  }
  return (
    <div>
      <h1>Profile</h1>

      <p>{user.user.name}</p>
      <p>{user.user.email}</p>
      {/* <div>{post}</div> */}
    </div>
  );
}
);
}

export default Profile;
