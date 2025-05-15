import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-100 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
