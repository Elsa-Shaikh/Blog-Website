import Post from "../model/postSchema.js";
import moment from "moment";

export const createPost = async (req, res) => {
  const { filename } = req.file;
  const { username, categories, title, description } = req.body;

  if (!filename) {
    return res.status(401).json({ success: false, message: "File not found!" });
  }
  const date = moment(new Date()).format("YYYY-MM-DD");
  try {
    const post = await new Post({
      title: title,
      description: description,
      picture: filename,
      username: username,
      categories: categories,
      createdDate: date,
    });

    const postData = post.save();

    return res
      .status(200)
      .json({ success: true, postData, msg: "Post Saved SuccessFully!" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Failed to Saved!" });
  }
};

export const getPost = async (req, res) => {
  let category = req.query.category;
  let posts;
  try {
    if (category) {
      posts = await Post.find({ categories: category });
    } else {
      posts = await Post.find({});
    }
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found!" });
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    return res
      .status(200)
      .json({ msg: "Post Updated Successfully!", updatedPost });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deletePost = async (req, res) => {
  console.log(req.params.id);
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not Found!" });
    }

    await Post.findByIdAndDelete(req.params.id);

    return res.status(200).json({ msg: "Post Deleted Successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
