import mongoose from "mongoose";

// Connect to MongoDB

mongoose
  .connect("mongodb://localhost:27017/myDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))

  .catch((err) => console.error("Connection error:", err));

// Define a schema for the user collection

const PostImage = new mongoose.Schema({
  videoFile: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  email: {
    type: String,
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


animalSchema.methods.hashing(function() {
    bcrypt.genSalt(this.password, (salt, err) => {
        if (err) throw err;
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) throw err;
            this.password = hash;
            // next();
        });
    })
})
