const mongoose = require("mongoose");

// Define the Quiz schema
const QuizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  rightAnswer: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "finished"],
    default: "inactive",
  },
});

// Create the Quiz model using the Quiz schema
const quizModel = mongoose.model("Quiz", QuizSchema);

// Export the Quiz model
module.exports = quizModel;
