const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const all = await Post.find();
    res.json(all);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const saved = await post.save();
    res.json(saved);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
