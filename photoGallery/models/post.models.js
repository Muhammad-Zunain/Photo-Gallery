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

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
