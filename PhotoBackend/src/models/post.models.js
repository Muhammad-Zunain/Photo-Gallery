import mongoose, { Schema } from "mongoose";


// Define a schema for the user collection

const postImage = new mongoose.Schema({
  imageFile: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }  
}, { timestamps: true });

export const Post = mongoose.model("Post", postImage)