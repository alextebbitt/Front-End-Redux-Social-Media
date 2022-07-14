import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { notification, Button,  Form, Input } from "antd";
import "./Login.scss";
const Login = () => {
  

  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      notification.error({ message: "Error", description: message });
    }

    if (isSuccess) {
      notification.success({ message: "Success", description: message });

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    }

    dispatch(reset());
  }, [isError, isSuccess, message]);
 
  const onFinish = (values) => {
     dispatch(login(values));
    
   };

   const onFinishFailed = (errorInfo) => {
     
   };

  return (
      <div className="page-container2">
    <div className="image2">
      <img className="imagelogin"
        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
        alt="Italian Trulli"
      ></img>
      </div>
        <div className="div-container2">
        <h1>Login</h1>
          <Form className="form"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      
    </div>
  );
};

export default Login;
