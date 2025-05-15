import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../utils/data";
import axios from "axios";

const Login = () => {
  console.log(BASE_URL);
  const [error, seterror] = useState({});
  const [formvalue, setformvalue] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformvalue({ ...formvalue, [name]: value });
    console.log(formvalue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log("Sign in with:", formvalue);
      const errors = validate(formvalue);
      if (Object.keys(errors).length === 0) {
        seterror({});
        axios
          .post(`${BASE_URL}/login`, formvalue, {
            withCredentials: true
          })
          .then((res) => {
            console.log("object");
            console.log(res.data.user.id);
            toast.success("Login success");
            sessionStorage.setItem("authToken", res.data.token);
            sessionStorage.setItem("userid", res.data.user.id);
            navigate("/");
            setformvalue({
              email: "",
              password: ""
            });
          })
          .catch((err) => {
            toast.error(err.response?.data?.message || "Login failed");
          });
      } else {
        seterror(errors);
        alert("email or password is invalid");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const validate = (value) => {
    const errors = {};
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!value.email) {
      errors.email = "this feild canot be empty";
    } else if (!emailRegex.test(value.email)) {
      errors.email = "enter a valied email";
    }
    if (!value.password) {
      errors.password = "this feild canot be empty";
    } else if (value.password.length < 8) {
      errors.password = "password must contain 8 characters";
    }
    return errors;
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <div className="bg-blue-300 p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              placeholder="you@example.com"
              name="email"
              value={formvalue.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your password"
              name="password"
              value={formvalue.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don't have an account?
          <Link to={"/register"} className="text-green-500 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
