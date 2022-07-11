import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Form, Input, notification } from "antd";
import {
  comment,
  resetMessage,
} from "../../../../features/posts/postsSlice";
import { useDispatch } from "react-redux";

const CommentModel = ({ visible, setVisible }) => {
  const { post } = useSelector((state) => state.posts);
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const newComment = { _id: post._id, comment:document.getElementById('commentValue').value };
    dispatch(comment(newComment));
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
console.log("comments", post)
  return (
      <Modal
      
      title="Comment"
      visible={visible}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form onFinish={onFinish} form={form}>
        <Form.Item label="TextArea" name="body">
          <TextArea rows={4} id="commentValue"/>
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

export default CommentModel