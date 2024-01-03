const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const punycode = require("punycode/");
const jwt = require("jsonwebtoken");
const app = express();
const port = 8002;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://pierre:pierre@cluster0.nflbjsv.mongodb.net/")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Failed to connect to MongoDB Atlas", err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const User = require("./models/user");
const Post = require("./models/post");
const { log } = require("console");

// endpont to register a user
app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password, userImage } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("[SERV] User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new User
    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
      userImage,
    });

    console.log("[SERV] New user created", newUser);

    // Create verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    console.log("[SERV] Verification token created", newUser);
    // Save user to database
    await newUser.save();

    // Send verification email
    await verificationEmailTemplate(newUser.email, newUser.verificationToken);
    res.status(202).json({
      message:
        "Registration successful, Please check your email for verification",
    });
  } catch (err) {
    console.log("[SERV] Error register user", err);
    res.status(500).json({ message: "Internal Server error" });
  }
});

// Verification Email
const verificationEmailTemplate = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pierre.antoniutti.devtool@gmail.com",
      pass: "ocft tirm cqiq glox",
    },
  });

  const mailOptions = {
    from: "SaisonnierApp",
    to: email,
    subject: "Verify your email",
    text: `Please verify your email by clicking on the link:
        http://localhost:8002/verify-email/${verificationToken}`,
  };

  // send email
  try {
    await transporter.sendMail(mailOptions);
    console.log("[SERV] Email sent successfully");
  } catch (err) {
    console.log("[SERV] Error sending email verification", err);
  }
};

// endpoint to verify email

app.get("/verify-email/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      console.log("[SERV] Invalid token");
      return res.status(400).json({ message: "Invalid token" });
    }
    // user is verified
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.log("[SERV] Error verifying email", err);
    res.status(500).json({ message: "Internal Server error" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

// endpoint to login a user

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("[SERV] User does not exist");
      return res.status(400).json({ message: "User does not exist" });
    }
    // check if password is correct
    if (password !== user.password) {
      console.log("[SERV] Password is incorrect");
      return res.status(401).json({ message: "Password is incorrect" });
    }

    // check if user is verified
    if (!user.verified) {
      console.log("[SERV] User is not verified");
      return res.status(402).json({ message: "User is not verified" });
    }

    // login successful
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (err) {
    console.log("[SERV] Error login user", err);
    res.status(500).json({ message: "Internal Server error" });
  }
});

// user profile

app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      console.log("[SERV] User not found");
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.log("[SERV] Error user profile", err);
    res.status(504).json({ message: "Internal Server error" });
  }
});

// all other users

app.get("/users/:userId", async (req, res) => {
  try {
    const loggedUsersId = req.params.userId;

    const loggInUser = await User.findById(loggedUsersId).populate(
      "connections",
      "_id"
    );
    if (!loggInUser) {
      console.log("[SERV] User not found");
      return res.status(404).json({ message: "User not found" });
    }
    // get the ID's of the connected users
    const connectedUsersIds = loggInUser.connections.map(
      (connection) => connection._id
    );

    // find the users who are not connected to the logged-in user Id
    const users = await User.find({
      _id: { $ne: loggedUsersId, $nin: connectedUsersIds },
    });

    res.status(200).json(users);
  } catch (err) {
    res.status(505).json({ message: "Internal Server error" });
  }
});
