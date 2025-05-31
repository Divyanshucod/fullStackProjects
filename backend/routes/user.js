const express = require("express");
const {
  userSchemaSignIn,
  userSchemaSignUp,
  updateBodySchema,
} = require("../zodSchemas");
const { User } = require("../UserModel");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleWare } = require("../middleware");
const bcrypt = require("bcrypt");
const { Account } = require("../AccountModel");
const UserRouter = express.Router();

UserRouter.post("/signup", async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  const validateUser = userSchemaSignUp.safeParse({
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
  });
  console.log(validateUser.error);

  if (!validateUser.success) {
    return res.status(411).json({
      message: "Please Enter a Validate details!",
    });
  }
  // database check for user existence.
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return res.status(403).json({
      message: "user already exist!",
    });
  }
  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const balance = randomBalanceGenerator();
  const user = await User.create({
    email,
    password: hashedPassword,
    lastname,
    firstname,
    balance: balance,
  });
  const id = user._id;
  // adding balance to the Account table
  await Account.create({
    userId: id,
    balance: balance,
  });

  res.status(200).json({
    message: "user created successfully!",
  });
});

UserRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const validateUser = userSchemaSignIn.safeParse({
    email: email,
    password: password,
  });
  if (!validateUser.success) {
    return res.status(411).json({
      message: "Please Enter a Validate details!",
    });
  }
  // database check for user existence.
  const userExist = await User.findOne({ email: email });
  if (!userExist) {
    return res.status(411).json({
      message: "User hasn't registered yet!",
    });
  }
  //password matching check
  const matched = await bcrypt.compare(password, userExist.password);
  if (!matched) {
    return res.status(411).json({
      message: "user email/password incorrect!",
    });
  }
  // creating a jsonwebtoken
  const token = jwt.sign({ id: userExist._id }, JWT_SECRET);
  res.status(200).json({
    token: token,
  });
});

UserRouter.put("/updateInfo", authMiddleWare, async (req, res) => {
  const body = req.body;
  const userId = req.userId;

  const { success } = updateBodySchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "Error while updating information...",
    });
  }

  if (body.password) {
    body.password = await bcrypt.hash(body.password, 10);
  }

  try {
    const updatedUserInfo = await User.findByIdAndUpdate(userId, body, {
      new: true,
    });

    return res.status(200).json({
      message: "Information Updated Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something happened in while doing DB query!",
    });
  }
});
UserRouter.get("/bulk", authMiddleWare, async (req, res) => {
  const filter = req.params.filter || "";
  const users = await User.find(
    {
      $or: [
        { lastname: { $regex: filter } },
        { firstname: { $regex: filter } },
      ]
    },
    { firstname: 1, lastname: 1, _id: 1 }
  );

  res.status(200).json({
    users,
  });
});
module.exports = {
  UserRouter,
};

function randomBalanceGenerator() {
  return Math.floor(Math.random() * 10000 + 1);
}
