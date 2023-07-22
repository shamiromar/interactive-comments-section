
const router = require("express").Router();
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);
router.get("/post/:id", postController.getOnePost);
router.get("/post/title/:title", postController.getOnePostFromTitle);
router.get("/userProfile/:userId", postController.getAllUserPost);
router.post("/userProfile/postNew", postController.createPost);
router.delete("/userProfile/delete/:id", postController.deletePost);
router.put("/userProfile/edit/:id", postController.editPost);

module.exports = router;

// const router = require("express").Router();
// const postController = require("../controllers/postController");

// router.get("/", postController.getAllPosts);
// router.get("/post/:id", postController.getOnePost);
// router.get("/post/title/:title", postController.getOnePostFromTitle);
// router.get("/userProfile/:userId", postController.getAllUserPost);
// router.post("/userProfile/postNew", postController.createPost);
// router.delete("/userProfile/delete/:id", postController.deletePost);
// router.put("/userProfile/edit/:id", postController.editPost);

// module.exports = router;
