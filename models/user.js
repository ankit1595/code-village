const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

// await User.collection.createIndex({ email: 1 }); // Index is not in schema
// Will drop the 'age' index and create an index on `name`
// User.syncIndexes();

module.exports = User;
