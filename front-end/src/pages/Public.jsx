import axios from "axios";
axios.defaults.withCredentials = true;
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BASE_URL from "../utils/data";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Public = () => {
  const userid = sessionStorage.getItem("userid");
  const token = sessionStorage.getItem("authToken");
  const [Blogs, setBlogs] = useState([]);
  const [page, setpage] = useState(1);
  const [totalpage, settotalpage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlog = async (pageNum = page) => {
      try {
        await axios
          .get(`${BASE_URL}/blog?page=${pageNum}&limit=${5}`)
          .then((res) => {
            console.log(res.data.blogs);
            setBlogs(res.data.blogs);
            settotalpage(res.data.totalpage);
            setpage(res.data.page);
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBlog(page);
  }, [page]);
  const handleEdit = (blog) => {
    sessionStorage.setItem("title", blog.title);
    sessionStorage.setItem("content", blog.content);
    navigate(`/blog/${blog._id}`);
  };
  const handleDelete = (id) => {
    try {
      axios
        .delete(`${BASE_URL}/blog/${id}`)
        .then((res) => {
          console.log(res);
          toast.success("blog deleted successfully");
          setBlogs(Blogs.filter((blog) => blog._id !== id));
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Latest Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
          {Blogs.length > 0 ? (
            Blogs.map((blog) => {
              return (
                <div key={blog._id} className="space-y-6">
                  <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mt-2">{blog.content}</p>
                    <p className="text-sm text-gray-400 mt-4">
                      Published on{" "}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-400 mt-4">
                      Published By {blog.userId.name}
                    </p>
                    {blog.userId._id === userid ? (
                      <div className="flex gap-4">
                        <button
                          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={() => handleEdit(blog)}
                        >
                          Edit
                        </button>
                        <button
                          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() => handleDelete(blog._id)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <h1>Loading</h1>
          )}
        </div>
        <div className="flex flex-wrap px-2 justify-center mt-6 gap-2">
          <button
            onClick={() => page > 1 && setpage(page - 1)}
            disabled={page === 1}
            className="bg-blue-500 text-white text-sm sm:text-base px-4 py-2 rounded disabled:opacity-50 "
          >
            Prev
          </button>
          {[
            Array.from({ length: totalpage }).map((_, i) => (
              <button
                key={i}
                onClick={() => setpage(i + 1)}
                className={
                  page === i + 1
                    ? "bg-blue-500 text-white px-4 py-2 rounded text-sm sm:text-base"
                    : "bg-white text-black px-4 py-2 rounded text-sm sm:text-base border border-gray-300"
                }
              >
                {i + 1}
              </button>
            ))
          ]}
          <button
            onClick={() => page < totalpage && setpage(page + 1)}
            disabled={page === totalpage}
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm sm:text-base disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Public;
