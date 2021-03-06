import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Form, Input } from "antd";
import {comment} from "../../../../features/posts/postsSlice";
import {reset,} from "../../../../features/auth/authSlice";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import "./CommentModel.scss";
const CommentModel = ({ isModalVisible, setIsModalVisible }) => {
    
  const { post } = useSelector((state) => state.posts);
  const { user, isError, isSuccess, message } = useSelector( (state) => state.auth);

  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

 

  const onFinish = (values) => {
    const newComment = {
      _id: post._id,
      comment: document.getElementById("commentValue").value,
    };
    dispatch(comment(newComment));
    // setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  return (
    <Modal
      title="Comments"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={[]}
    >
      {post?.comments?.map((comment) => {
          post.comments.map(function(){
              
            if(user.user._id === post.comments.userId) {
                <div><p>{user.user.name}</p></div>
            }
          })
        //   if(user.user._id === post.comments.userId) {
        //     <p>{user.user.name}</p>
        //   }
          
        return (
          <div className="commentdiv">
            <p>User name: {user.user.name}</p>
            <p>Comment: {comment.comment}</p>
            <p>User Id: {comment.userId}</p>
          </div>
        );
      })}


       <Form onFinish={onFinish} form={form}>
        <Form.Item label="Comment" name="body">
          <TextArea rows={4} id="commentValue" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form> 
    </Modal>
  );
};

export default CommentModel;
