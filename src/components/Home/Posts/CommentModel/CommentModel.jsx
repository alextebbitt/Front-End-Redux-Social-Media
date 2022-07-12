import React from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Form, Input } from "antd";
import {comment} from "../../../../features/posts/postsSlice";
import { useDispatch } from "react-redux";
import "./CommentModel.scss";
const CommentModel = ({ isModalVisible, setIsModalVisible }) => {
    console.log("visible", isModalVisible)
  const { post } = useSelector((state) => state.posts);
  console.log("este es el post", post)
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
      title="Comment"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={[]}
    >

      {post?.comments?.map((comment) => {
        console.log("heyyyyy", post.comments)
        return (
          <div className="commentdiv">
            <p>{comment.comment}</p>
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
