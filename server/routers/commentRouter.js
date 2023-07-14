const router = require("express").Router();
const commentController = require("../controllers/commentController.js");

router.get("/comment/:title", commentController.getAllCommentsByTitle);
router.get("/comment/:userId", commentController.getAllUserCommentsByUserId);
router.get("/comment/:id", commentController.getOneComment);
router.post("/comment/new", commentController.postOneComment);
router.delete("/comment/delete/:id", commentController.deleteComment);
router.put("/comment/edit/:id", commentController.editComment);

module.exports = router;
