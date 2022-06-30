import { useSelector } from "react-redux";
import { Spin } from "antd";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
if (!user) {
    return <Spin />;
}
  return (
    <div>
      <h1>Profile</h1>

      <p>{user.user.name}</p>
      <p>{user.user.email}</p>
    </div>
  );
};

export default Profile;
