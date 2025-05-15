const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../model/user");

module.exports.register = async (req, res) => {
  try {
    const User = req.body;
    console.log(User);
    if (!User.email || !User.password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await Users.findOne({ email: User.email });
    if (user) {
      res.status(409).json({ message: "User already exists!" });
    } else {
      const newUser = await Users.create({
        name: User.name,
        email: User.email,
        password: User.password
      });
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign(
        {
          id: newUser._id,
          email: newUser.email
        },
        secret,
        { expiresIn: "1d" }
      );
      console.log(token);
      res.cookie("authToken", token, { httpOnly: true,secure: true,sameSite: "None"});
      res.status(200).json({
        message: "your data has been registered!",
        user: {
          id: newUser.id,
          email: newUser.email
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    console.log(user);
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email
          },
          secret,
          { expiresIn: "1d" }
        );
        console.log(token);
        res.cookie("authToken", token, { httpOnly: true,secure: true,sameSite: "None"});
        res.status(200).json({
          message: "success",
          user: {
            id: user.id,
            email: user.email
          }
        });
      } else {
        res.status(401).json({ message: "Incorrect password!" });
      }
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
