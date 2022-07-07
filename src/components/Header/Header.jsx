
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { notification, Avatar, } from "antd";
import {
  LogoutOutlined,
  HomeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import './Header.scss';
import Logo3 from "../../assets/logo3.png";
import Logo4 from "../../assets/logo4.png";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
    if (e.key === "Enter") {
      navigate("/search/" + text)
    }
  };
  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    notification.success({ message: "logged out successfully" });
    
      navigate("/login");
   
  };

  return (
    <nav>
      <div className="topnav">
        <img src={Logo3} height="80px" alt="Girl in a jacket"></img>

        <div className="headerstuff">
          <div className="searchbar">
            <SearchOutlined/>
            <input className="inputsearch"
              onKeyUp={handleChange}
              placeholder="Search post"
              name="text"
            />
          </div>
          <span>
            <Link to="/">
              <HomeOutlined />
            </Link>
          </span>
          {user ? (
            <>
              <span>
                <Link to="/" onClick={onLogout}>
                  {<LogoutOutlined />}
                </Link>
              </span>
              <span>
                <Link to="/profile">
                  <Avatar>{user.user.name[0]}</Avatar>
                </Link>
              </span>
              {user.user.role === "admin" ? (
                <span>
                  <Link to="/admin">Admin</Link>
                </span>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <span>
                <Link to="/login">Login</Link>
              </span>
              <span>
                <Link to="/register">Register</Link>
              </span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
