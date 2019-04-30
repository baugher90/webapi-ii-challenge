const express = require("express");
const Posts = require("../data/db");
const router = express.Router();
//========================================Post API's
router.post("/", async (req, res) => {
    try {
        const post = await Posts.insert(req.body);
        res.status(201).json(post);
    } catch(err) {
        res.status(500).json({
            message:"Error adding post"
        })
    }
});
//========================================Get API's
router.get("/", async (req, res) => {
    try {
        const post = await Posts.find(req.body);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving the posts"
          });
    }
});
//-----------------------------------
router.get("/:id", async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);
  
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error retrieving the post"
      });
    }
  });
//========================================Update API's
router.put("/:id", async (req, res) => {
    try {
      const post = await Posts.update(req.params.id, req.body);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error updating the post"
      });
    }
  });
//========================================Delete API's
router.delete("/:id", async (req, res) => {
    try {
      const post = await Posts.remove(req.params.id);
      if (post > 0) {
        res.status(200).json({ message: "The post has been nuked" });
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error removing the post"
      });
    }
  });

module.exports = router;