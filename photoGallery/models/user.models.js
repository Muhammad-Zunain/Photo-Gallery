import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Connect to MongoDB

mongoose
  .connect("mongodb://localhost:27017/myDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))

  .catch((err) => console.error("Connection error:", err));

// Define a schema for the user collection

const userSchema = new mongoose.Schema({
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
}, { timestamps });


// Hash the password before saving the user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    try {
        this.password = await bcrypt.hash(this.password,10);
        next();
    } catch (err) {
      return next(err);
    }
  });
  
  // Create and export the model
export default mongoose.model("User", userSchema);
