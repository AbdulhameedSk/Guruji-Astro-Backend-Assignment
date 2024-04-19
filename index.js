const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const rateLimit = require("express-rate-limit");
const userRoutes = require('./routes/users');
const quizRoutes = require('./routes/quizzes');

const app = express();

// Import the cornJob module
require('./cornJob');

// Configure rate limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan("dev")); // Log HTTP requests

// Import and use user and quiz routes
app.use('/users', userRoutes);
app.use('/quizzes', quizRoutes);

// Default route handler
// app.get("*", (req, res) => {
//   res.status(200).send({
//     msg: "WRONG ROUTE PLEASE CHECK",
//   });
// });

// Start the server
const PORT = process.env.PORT || 1996;
app.listen(PORT, () => {
  console.log(`Listening at ` + PORT.bgYellow);
});
