const blogModel = require("../model/blog");

module.exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userdetails.id;
    console.log(userId);
    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newBlog = await blogModel.create({
      title: title,
      content: content,
      userId: userId
    });
    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const blogs = await blogModel
      .find()
      .populate("userId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalNumberOfBlogs = await blogModel.countDocuments();
    res
      .status(200)
      .json({
        blogs,
        page,
        totalpage: Math.ceil(totalNumberOfBlogs / limit),
        totalNumberOfBlogs
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.editblog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blogId = req.params.id;
    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const updatedBlog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      {
        title: title,
        content: content
      },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Couldn't update Blog" });
    }
    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await blogModel.findOneAndDelete({ _id: blogId });
    if (!deletedBlog) {
      return res.status(404).json({ message: "Couldn't delete Blog" });
    }
    res.status(200).json({
      message: "Blog deleted successfully",
      blog: deletedBlog
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
