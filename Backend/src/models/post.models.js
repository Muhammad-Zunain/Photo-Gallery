import mongoose, { Schema } from "mongoose";


// Category Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

// Post Schema
const postSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  file: {
    type: String,  
    required: true,
  },
  mediaType: {
    type: String,
    enum: ['photo'],  
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  
  },
  tags: {
    type: [String],  
    default: [],
  },
  uploadDate: {
    type: Date,
    default: Date.now,  
  },
  views: {
    type: Number,
    default: 0,  
  },
  
});

// Models
const Category = mongoose.model('Category', categorySchema);
const Post = mongoose.model('Post', postSchema);

export { Post, Category };

