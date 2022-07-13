import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./Register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, message, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: message,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    dispatch(reset());
  }, [isSuccess, isError, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,

      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      return notification.error({
        message: "Error",
        description: "Passwords do not match",
      });
    } else {
      return dispatch(register(formData));
    }
  };

  return (
    <div className="">
      <div className="registerpage">
        <img src={Logo} alt="" height="500px" className="imagelogo"/>
      <div className="register-form">
      <h1 className="signup">Sign up</h1>
        <form className="formform" onSubmit={onSubmit}>
          <h3>Name</h3>
          <input className="name" type="text" name="name" value={name} onChange={onChange} />
          <h3>Email</h3>
          <input type="email" name="email" value={email} onChange={onChange} />
          <h3>Password</h3>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <h3>Repeat password</h3>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
          <br></br>
          <button className="button-signup" type="submit">
            Register
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Register;
