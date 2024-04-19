const express = require("express");
const User = require("../models/userModel");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middlewares/authMiddleware");
const z = require("zod");

const router = express.Router();
const JWT_SECRET = "SECRET";

// Define the schema for signup request body
const signupBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

// Handle signup request
const signup = async (req, res) => {
  try {
    const { success, data: parsedData } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "username already taken / Incorrect inputs",
      });
    }
    const { username, password } = parsedData;

    // Check if the user already exists
    const present = await User.findOne({ username });
    if (present) {
      return res.status(411).send({
        msg: "User Already Exists",
      });
    }

    // Hash the password
    const hashed = await bcrypt.hash(password, 12);

    // Create a new user
    const add = await User.create({
      username,
      password: hashed,
    });

    console.log(`New User with id ${add._id} created`);

    // Generate a JWT token
    var token = jwt.sign({ userId: add._id }, JWT_SECRET);

    // Send response with token
    res.status(200).send({
      msg: "User Created Successfully",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      msg: "An error occurred while processing your request",
      error,
    });
  }
};

// Define the schema for signin request body
const signinBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

// Handle signin request
const signin = async (req, res) => {
  const { success, data: parsedData } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).send({ message: "Error while logging in" });
  }
  const { username, password } = parsedData;

  // Check if the user exists
  const present = await User.findOne({ username });
  if (!present) {
    return res.status(411).send({
      message: "Error while logging in",
    });
  }

  // Compare the provided password with the stored password
  const real = await bcrypt.compare(password, present.password);
  if (!real) {
    return res.status(411).send({
      message: "Wrong Password",
    });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: present._id }, JWT_SECRET);

  // Send response with token
  return res.status(200).send({ token, message: "LoggedIn successfully" });
};

// Define routes
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
