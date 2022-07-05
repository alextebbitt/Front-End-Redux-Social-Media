import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { getInfo } from '../../features/auth/authSlice';
import { createPost} from "../../features/posts/postsSlice";
import "./CreatePost.css";

const CreatePost = () => {
const [title, setTitle] = useState('');
const [ description, setDescription ] = useState("");
const dispatch = useDispatch();

function OnCreatePost (e) {
    e.preventDefault();
    const postData = {
        title,
        body: description
    }
       
         dispatch(createPost(postData));
        
        
}
  return (
    <>
      <div className='create-post-container'>
        <div>
          <div className="create-post">
            <h2>Create Post</h2>
          </div>
        </div>

        <div>
          <form className='form' onSubmit={OnCreatePost}>
            <div>
              <label>Title</label>
              <div>
                <input
                  type="text"
                  className="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label>Description</label>
              <div>
                <textarea
                  className="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button type="submit" className="submit">
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePost