import Posts from "./Posts/Posts"
import CreatePost from "../CreatePost/CreatePost";
import Logo2 from "../../assets/logo2.png";
import "./Home.scss";

const Home = () => {
  return (
    <div>
      <img src={Logo2} alt="hhhhh" className="logo-image" />
      <CreatePost />
      <Posts />
    </div>
  );
}

export default Home