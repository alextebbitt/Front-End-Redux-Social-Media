import Posts from "./Posts/Posts"
import CreatePost from "../CreatePost/CreatePost";


const Home = () => {
  return (
    <div>Home
      <CreatePost/>
      <Posts/>
    </div>
  )
}

export default Home