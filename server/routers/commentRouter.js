const router = require("express").Router();
const commentController = require("../controllers/commentController.js");

router.get("/comments", commentController.getAllComments);
router.get("/comment/title/:title", commentController.getAllCommentsByTitle);
router.get("/comment/user/:userId", commentController.getAllUserCommentsByUserId);
router.get("/comment/:id", commentController.getOneComment);
router.post("/comment/new", commentController.postOneComment);
router.delete("/comment/delete/:id", commentController.deleteComment);
router.put("/comment/edit/:id", commentController.editComment);

module.exports = router;
