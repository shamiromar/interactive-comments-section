const router = require("express").Router();
const replyController = require("../controllers/replyController");

router.get("/reply/:commentId", replyController.getReplyByCommentId);
router.post("/reply", replyController.postReply);
router.delete("/reply/delete/:id", replyController.deleteReply);
router.put("/reply/edit/:id", replyController.editReply);

module.exports = router;


// const router = require("express").Router();
// const replyController = require("../controllers/replyController");

// router.get("/reply/:commentId", replyController.getReplyByCommentId);
// router.post("/reply", replyController.postReply);
// router.delete("/reply/delete/:id", replyController.deleteReply);
// router.put("/reply/edit/:id", replyController.editReply);

// module.exports = router;
