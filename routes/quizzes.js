const express = require("express");
const Quiz = require("../models/quizModel");
const { log } = require("console");
const router = express.Router();
const {authMiddleware}=require('../middlewares/authMiddleware');
router.use(authMiddleware);
router.post("/", async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/active", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ status: "active" });
    if (!quiz) {
      return res.status(404).json({ message: "No active quiz found" });
    }
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/:id/result", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res
        .status(404)
        .json({ message: "Quiz not found" });
    }
    if (quiz.status !== "finished") {
      return res.status(404).json({ message: "Quiz not finished after finishing right answer will be revealed" });
    }
    const result = quiz.options[quiz.rightAnswer] || "No right answer";
    res.json({ rightAnswer: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
