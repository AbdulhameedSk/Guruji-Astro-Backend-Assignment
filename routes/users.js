const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
var jwt = require("jsonwebtoken");
const  JWT_SECRET ="SECRET"
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middlewares/authMiddleware");
const z = require("zod");

const signupBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

const signup = async (req, res) => {
  try {
    const { success, data: parsedData } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "username already taken / Incorrect inputs",
      });
    }
    const { username, password } = parsedData;
    const present = await User.findOne({ username });
    if (present) {
      return res.status(411).send({
        msg: "User Already Exists",
      });
    }
    const hashed = await bcrypt.hash(password, 12);
    const add = await User.create({
      username,
      password: hashed,
    });

    console.log(`New User with id ${add._id} created`);

    var token = jwt.sign({ userId: add._id }, JWT_SECRET);
    res.status(200).send({
      msg: "User Created Successfully",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      msg: "An error occurred while processing your request",error
    });
  }
};

const signinBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

const signin = async (req, res) => {
  const { success, data: parsedData } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).send({ message: "Error while logging in" });
  }
  const { username, password } = parsedData;
  const present = await User.findOne({ username });
  if (!present) {
    return res.status(411).send({
      message: "Error while logging in",
    });
  }
  const real = await bcrypt.compare(password, present.password);
  if (!real) {
    return res.status(411).send({
      message: "Wrong Password",
    });
  }
  const token = jwt.sign({ userId: present._id }, JWT_SECRET);
  return res.status(200).send({ token, message: "LoggedIn successfully" });
};
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
