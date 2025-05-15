import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const userid = sessionStorage.getItem("userid");
  const navigate = useNavigate();
  const handleAdd = () => {
    if (userid) {
      navigate("/blog");
    } else {
      toast.error("Login to Post Blog!");
    }
  };
  const handleClick = () => {
    navigate("/login");
  };
  const handleBlogClick = () => {
    navigate("/");
  };
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600" onClick={handleBlogClick}>MyBlog</h1>
        <nav className="space-x-4 text-gray-600 font-medium">
          <span
            onClick={handleClick}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Login
          </span>
          <span
            onClick={handleAdd}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Add
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
