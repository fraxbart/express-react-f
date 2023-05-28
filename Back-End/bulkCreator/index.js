import { text } from "express";
import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";
import mongoose from "mongoose";

const bulkUploadPosts = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/epicode");
  const user = await UserModel.findOne();
  console.log(user)
  for (let i = 0; i < 1000; i++) {
    console.log(i, user)
    const post = new PostModel({
      author: user,
      title: `This is post n. ${i}`,
      text: `This is post n. ${i}`,
    });
    await post.save();
  }
};

bulkUploadPosts()
