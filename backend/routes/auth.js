const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/signup", async(req, res) => {
    try {
        const { email, password, role } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashed,
            role: role || "user"
        });

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({ message: "User registered", token, user: { id: newUser._id, email: newUser.email, role: newUser.role } });

    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // JWT 발급
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role, level: user.level, name: user.name }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;