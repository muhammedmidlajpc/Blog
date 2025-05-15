import axios from "axios";
axios.defaults.withCredentials = true;
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import BASE_URL from "../utils/data";
import { useNavigate, useParams } from "react-router-dom";

const Blog = () => {
  const [isEdit, setisEdit] = useState(false);
  const blogid = useParams().id;
  const userid = sessionStorage.getItem("userid");
  console.log(isEdit);
  const navigate = useNavigate();
  const [formvalue, setformvalue] = useState({
    title: "",
    content: "",
    userId: userid
  });
  useEffect(() => {
    if (blogid) {
      setisEdit(true);
      setformvalue({
        title: sessionStorage.getItem("title") || "",
        content: sessionStorage.getItem("content") || "",
        userId: userid
      });
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (
        formvalue.content.trim().length <= 0 ||
        formvalue.title.trim().length <= 0
      ) {
        toast.warning("please fill all the fields");
        return;
      }
      const request = isEdit
        ? axios.put(`${BASE_URL}/blog/${blogid}`, formvalue)
        : axios.post(`${BASE_URL}/blog`, formvalue);
      request
        .then((res) => {
          console.log(res);
          toast.success(
            isEdit ? "Blog updated successfully" : "Blog added successfully"
          );
          if (isEdit) {
            navigate("/");
          }
          setisEdit(false);
          setformvalue({
            title: "",
            content: "",
            userId: userid
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response?.data?.message || "Something went wrong");
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Blog</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formvalue.title}
              onChange={(e) =>
                setformvalue({ ...formvalue, [e.target.name]: e.target.value })
              }
              placeholder="Enter blog title"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Content
            </label>
            <textarea
              rows="5"
              name="content"
              value={formvalue.content}
              onChange={(e) =>
                setformvalue({ ...formvalue, [e.target.name]: e.target.value })
              }
              placeholder="Write your blog content here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              {isEdit ? "Update Blog" : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Blog;
