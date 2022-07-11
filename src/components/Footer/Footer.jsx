import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import "./Footer.scss";

const Footer = () => {
    const navigate = useNavigate();
    const [text, setText] = useState("");
const handleChange = (e) => {
  setText(e.target.value);
console.log("this is test", text)
  if (e.key === "Enter") {
    navigate("/searchuser/" + text);
  }
};

  return (
    <div className='searchuserbar'>
      <input onKeyUp={handleChange} placeholder="Search user" name="text" />
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
  );
}

export default Footer