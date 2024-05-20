import express from "express";
import "dotenv/config.js";
import mongoose from "mongoose";
import redisConnect from "./utils/redisClient.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const redisClient = await redisConnect();
// User Model( This project is very small that is the reason it is not separated into different folder structure)

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("User", userSchema);

// create the user route.

app.post("/api/v1/users/create", async (req, res) => {
  try {
    const { name, email } = req.body;
    const existingUser = await User.find({
      email: email,
    });
    if (existingUser && existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User Already exists",
      });
    }
    const user = await User.create({ name, email });
    (await redisConnect()).del("allUsers");
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create the user",
      Error: error.message || "Something went wrong! Please try after sometime",
    });
  }
});

// list the users form the database
app.get("/api/v1/users/lists", async (req, res) => {
  try {
    let chacheKey = "allUsers";
    const chacheUsers = await redisClient.get(chacheKey);
    if (chacheUsers) {
      console.log("Users fetched from the redis");
      return res.status(200).json({
        success: true,
        message: "users fetched successfully",
        data: JSON.parse(chacheUsers),
      });
    }
    const users = await User.find();
    redisClient.set(chacheKey, JSON.stringify(users), "EX", 3600);
    res.status(201).json({
      success: true,
      message: "users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch the users",
      Error: error.message || "Something went wrong! Please try after sometime",
    });
  }
});
const callback = async (err) => {
  if (err) throw err;
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Successfully connected to database");
    console.log(`App is listening to the port ${PORT}`);
  } catch (error) {
    console.log("Failed to connect to the database", error);
    process.exit();
  }
};

app.listen(PORT, callback);
