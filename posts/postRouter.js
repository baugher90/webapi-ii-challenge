const express = require("express");
const Posts = require("../data/db");
const router = express.Router();
//========================================Post API's
router.post("/", async (req, res) => {
  const post = req.body;
  if (post.title && post.contents) {
    Posts.insert(post)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({
          message: "Error retrieving the posts"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "There was an error while saving the post to the database."
    });
  }
});
//========================================Get API's
router.get("/", async (req, res) => {
  try {
    const post = await Posts.find(req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({
      message: "The post information could not be retrieved."
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
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (err) {
    res.status(500).json({
      message: "The post information could not be retrieved."
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
      message: "The post information could not be modified."
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
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (err) {
    res.status(500).json({
      message: "The post could not be removed"
    });
  }
});

module.exports = router;
