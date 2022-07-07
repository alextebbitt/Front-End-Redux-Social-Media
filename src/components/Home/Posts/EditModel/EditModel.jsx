import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Form, Input, } from "antd";
import { updatePost } from "../../../../features/posts/postsSlice";
import { useDispatch } from "react-redux";

const EditModel = ({ visible, setVisible }) => {
  const { post } = useSelector((state) => state.posts);
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    const postToEdit = {
      ...post,
    };
    form.setFieldsValue(postToEdit);
  }, [post]);

  const onFinish = (values) => {
const postWithId = { ...values, id: post._id };
dispatch(updatePost(postWithId));
setVisible(false);

};
      return (
        <Modal
          title="Edit Post"
          visible={visible}
        //   onCancel={handleCancel}
          footer={[]}
        >
          <Form onFinish={onFinish} form={form}>
            <Form.Item label="Post Title" name="title">
              <Input placeholder="Post title" />
            </Form.Item>
            <Form.Item label="TextArea" name="body">
              <TextArea rows={4} />
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

export default EditModel;