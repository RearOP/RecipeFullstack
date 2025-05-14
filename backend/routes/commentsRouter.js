const express = require("express");
const router = express.Router();
const Comment = require("../models/comments_model");

router.get("/:recipeId", async (req, res) => {
  try {
    const comments = await Comment.find({ recipeId: req.params.recipeId })
      .populate("user", "fullname profilePic")
      .populate({
        path: "replies.user",
        select: "fullname profilePic",
      }).sort({ createdAt: -1 });
    // Convert profilePic to base64 if it's a Buffer
    comments.forEach((comment) => {
      if (comment.user.profilePic) {
        comment.user.profilePic = comment.user.profilePic.toString("base64");
      }
    });
    res.json({ comments });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

router.post("/writecomment", async (req, res) => {
  try {
    const { recipeId, user, text } = req.body;

    if (!recipeId || !user || !text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newComment = new Comment({
      recipeId,
      user,
      text,
      replies: [],
    });

    await newComment.save();

    res.json({ comment: newComment });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ error: "Failed to post comment" });
  }
});

router.post("/reply/:commentId", async (req, res) => {
  try {
    const { user, text } = req.body;
    const comment = await Comment.findById(req.params.commentId);
    comment.replies.push({ user, text });
    await comment.save();
    res.json({ comment });
  } catch (err) {
    res.status(500).json({ error: "Failed to post reply" });
  }
});

router.post("/replydelete/:replyId", async (req, res) => {
  try {
    const { user } = req.body; // user is logged-in user's _id
    const { replyId } = req.params;

    // Find the parent comment that contains the reply with given replyId and user match
    const comment = await Comment.findOne({
      "replies._id": replyId,
      "replies.user": user,
    });

    if (!comment) {
      return res.status(403).json({ error: "Unauthorized or reply not found" });
    }

    // Pull the reply from replies array
    const updatedComment = await Comment.findOneAndUpdate(
      { "replies._id": replyId },
      { $pull: { replies: { _id: replyId } } },
      { new: true }
    );

    res.json({ success: true, updatedComment });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ error: "Failed to delete reply" });
  }
});

router.post("/replyedit/:replyId", async (req, res) => {
  try {
    const { user, text } = req.body;
    const { replyId } = req.params;

    const updatedComment = await Comment.findOneAndUpdate(
      {
        "replies._id": replyId,
        "replies.user": user,
      },
      {
        $set: { "replies.$[replyElem].text": text },
      },
      {
        arrayFilters: [{ "replyElem._id": replyId }],
        new: true,
      }
    );

    if (!updatedComment) {
      return res.status(403).json({ error: "Unauthorized or reply not found" });
    }

    res.json({ success: true, updatedComment });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ error: "Failed to edit reply" });
  }
});

router.post("/editcomment/:commentId", async (req, res) => {
  try {
    const { user, text } = req.body;
    const { commentId } = req.params;

    const updatedComment = await Comment.findOneAndUpdate(
      {
        _id: commentId,
        user: user, // Ensure ownership
      },
      { $set: { text: text } },
      { new: true }
    );

    if (!updatedComment) {
      return res
        .status(403)
        .json({ error: "Unauthorized or comment not found" });
    }

    res.json({ success: true, updatedComment });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ error: "Failed to edit comment" });
  }
});

router.post("/deleteComment/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    // console.log(commentId);

    // Pull the reply from replies array
    const updatedComment = await Comment.findOneAndDelete(
      { "_id": commentId },
    );
    

    res.json({ success: true, updatedComment });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ error: "Failed to delete Comment" });
  }
});

module.exports = router;
