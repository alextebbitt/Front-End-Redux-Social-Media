import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  SearchOutlined
} from "@ant-design/icons";
import "./Footer.scss";
import { useSelector } from 'react-redux';

const Footer = () => {
    const navigate = useNavigate();
     const { user } = useSelector((state) => state.auth);
    const [text, setText] = useState("");
const handleChange = (e) => {
  setText(e.target.value);
console.log("this is test", text)
  if (e.key === "Enter") {
    navigate("/searchuser/" + text);
  }
};

  return (
    <>
      {user ? (
        <div className="topdiv">
          <div className="searchuserbardiv">
            <div className="otherdiv">
              <SearchOutlined />
              <input
                className="searchuserbarinput"
                onKeyUp={handleChange}
                placeholder="Search user"
                name="text"
              />
            </div>
          </div>
          <div className="bigcontainer">
            <div className="logos">
              <a href="https://www.facebook.com" target="_blank">
                <FacebookOutlined />
              </a>
              <a href="https://www.twitter.com" target="_blank">
                <TwitterOutlined />
              </a>
            </div>
            <div className="footer">
              <p className="copy">
                &copy; 2022 PurpleFace ---Alex--- All rights reserved.
              </p>
            </div>
            <div className="logos2">
              <a href="https://www.youtube.com" target="_blank">
                <YoutubeOutlined />
              </a>
              <a href="https://www.instagram.com" target="_blank">
                <InstagramOutlined />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="topdiv">
          <div className="bigcontainer">
            <div className="logos">
              <a href="https://www.facebook.com" target="_blank">
                <FacebookOutlined />
              </a>
              <a href="https://www.twitter.com" target="_blank">
                <TwitterOutlined />
              </a>
            </div>
            <div className="footer">
              <p className="copy">
                &copy; 2022 PurpleFace ---Alex--- All rights reserved.
              </p>
            </div>
            <div className="logos2">
              <a href="https://www.youtube.com" target="_blank">
                <YoutubeOutlined />
              </a>
              <a href="https://www.instagram.com" target="_blank">
                <InstagramOutlined />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer