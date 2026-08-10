import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const {register} = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { fullName, username, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }
    const dataToSend = {
      fullName,
      username,
      email,
      password,
    };
    try {
      await register(dataToSend);

      alert("Registration successful. Please login.");

      navigate("/login");


    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        placeholder="Enter Your Full Name"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Enter Your username"
        required
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Enter Your email"
        required
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter Your Password"
        required
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm your Password"
        required
        onChange={handleChange}
      />
    </form>
  );
}

export default Register;
