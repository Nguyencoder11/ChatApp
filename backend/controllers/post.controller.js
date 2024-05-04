import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const createNewPost = async (req, res) => {
  try {
    const user = await User.findById(req.body.author);
    console.log(req.body.author);
    console.log(req.file);
    if (!user) {
      return res.status(404).json({ code: 404, message: "User not found" });
    }

    // Kiểm tra xem người dùng đã có bài viết hay chưa
    if (user.post) {
      return res
        .status(400)
        .json({ code: 400, message: "User already has a post" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ code: 400, message: "Please upload an image" });
    }

    const imgUrlReplace = req.file.path.replace("\\", "/");

    const newPost = new Post({
      username: req.body.username,
      content: req.body.content,
      author: user._id,
      imgUrl: imgUrlReplace,
      date: Date.now(),
    });
    const savedPost = await newPost.save();

    // Cập nhật trường post của người dùng với id của bài viết mới
    user.post = savedPost._id;

    // Lưu lại sự thay đổi
    await user.save();

    return res
      .status(201)
      .json({ code: 201, message: "Post created", post: savedPost });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

export const getPostByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ code: 404, message: "User not found" });
    }

    const post = await Post.findById(user.post);
    if (!post) {
      return res.status(404).json({ code: 404, message: "Post not found" });
    }

    return res
      .status(200)
      .json({ code: 200, message: "Post found", post: post });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ code: 404, message: "Post not found" });
  }

  const user = await User.findById(post.author);
  if (!user) {
    return res.status(404).json({ code: 404, message: "User not found" });
  }

  const deletedPost = await Post.findByIdAndDelete(id);
  user.post = null;

  // Lưu lại sự thay đổi trong thông tin người dùng
  await user.save();

  return res
    .status(200)
    .json({ code: 200, message: "Post deleted", post: deletedPost });
};

export const getAllPost = async (req, res) => {
  const posts = await Post.find();
  return res.status(200).json({ code: 200, message: "All posts", posts });
};
