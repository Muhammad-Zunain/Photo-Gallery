import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Connect to MongoDB

mongoose
  .connect("mongodb://localhost:27017/myDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))

  .catch((err) => console.error("Connection error:", err));

// Define a schema for the user collection

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps }
);

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    return next(err);
  }
});

// Compare  Password is correct for current password 
userSchema.method.isPasswordCorrect = async function (password) {
 return await bcrypt.compare(password, this.password) 
};

// Generate Access Token And set the expire 
userSchema.method.generateAccessToken =  function(){
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username
  },
  // Add the Access Token from the .env,
  {
    // expireIn: add expire from the .env
  }
)
};

// Generate the Refresh Token And set the expire
userSchema.method.generateRefreshToken =  function(){
  return jwt.sign({
    _id: this._id,
  },
  // Add the Refresh Token from the .env,
  {
    // expireIn: add Refresh from the .env
  }
)
};

// Create and export the model
export const User = mongoose.model("User", userSchema);
