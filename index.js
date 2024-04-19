const express = require("express");
//To stop cross origin restriction
const cors = require("cors");
const morgan = require("morgan");
//Console colors
const colors = require("colors");
//For secure Credientials
const dotenv = require("dotenv");
//Connect DB
const connectDB = require("./db");
const app = express();
const rateLimit = require("express-rate-limit");

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
 require('./cornJob');
// app.use(limiter);

//env_config
dotenv.config();
connectDB();
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
const userRoutes = require('./routes/users');
const quizRoutes = require('./routes/quizzes');
app.use('/users', userRoutes);
app.use('/quizzes', quizRoutes);
// app.get("*", (req, res) => {
//   res.status(200).send({
//     msg: "WRONG ROUTE PLEASE CHECK",
//   });
// });

//listen
const PORT = process.env.PORT || 1996;
app.listen(PORT, () => {
  console.log(`Listening at ` + PORT.bgYellow);
});
