import React from 'react'
import {
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import "./Footer.scss";

const Footer = () => {
  return (
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
      <div className='logos2'>
        <a href="https://www.youtube.com" target="_blank">
          <YoutubeOutlined />
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <InstagramOutlined />
        </a>
      </div>
    </div>
  );
}

export default Footer