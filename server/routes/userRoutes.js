const express = require("express");
const multer = require("multer");
const User = require("../models/Users");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Upload to 'uploads' folder

// Create user
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, age } = req.body;
    const user = new User({
      name,
      age,
      image: req.file ? req.file.filename : null,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to add user" });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Update user
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, age } = req.body;
    const updateData = { name, age };
    if (req.file) updateData.image = req.file.filename;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

module.exports = router;
