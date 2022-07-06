import { useSelector } from "react-redux";
import { Spin } from "antd";
import "./Profile.scss";



const Profile = () => {
  //  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  console.log(user.user);
  const userPost = user.user.postIds.map((postids) => {
    return (
      <div>
        <p>{postids.title}</p>
        <p>{postids.body}</p>
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
      <h1>Your Profile</h1>
      <div className="name-email">
        <h2>Name: {user.user.name}</h2>
        <h2>Email: {user.user.email}</h2>
      </div>

      <div className="posts">
        <h2>Your posts:</h2>
        {userPost}
      </div>
    </div>
  );
};

export default Profile;
