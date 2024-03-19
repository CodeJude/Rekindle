import fs from "fs";
import mongoose from "mongoose";

import PostMessage from "../models/postModels.js";

// Getting the Post
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Create a new Post
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    res.status(201).json({ status: "success", data: newPost });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

//Update a post
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid post ID format" });
  }

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.log(error);
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid post ID format" });
  }

  try {
    const postToDelete = await PostMessage.findById(id);

    if (!postToDelete) {
      return res.status(404).json({ error: `Post with id: ${id} not found` });
    }

    await PostMessage.findByIdAndDelete(id);

    res.json({ message: "Post Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Liking a post
export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid post ID format" });
  }

  try {
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      {
        likeCount: post.likeCount + 1,
      },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
