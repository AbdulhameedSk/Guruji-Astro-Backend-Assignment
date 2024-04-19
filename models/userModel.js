const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the user model using the schema
const userModel = mongoose.model("User", userSchema);

// Export the user model
module.exports = userModel;
