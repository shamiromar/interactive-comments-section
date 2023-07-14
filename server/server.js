const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

const commentRouter = require("./routers/commentRouter");
const userRouter = require("./routers/userRouter");
const replyRouter = require("./routers/replyRouter");
const postRouter = require("./routers/postRouter");

app.use(
  cors({
    origin: "*",
  })
);

app.use("/", commentRouter);
app.use("/", userRouter);
app.use("/", replyRouter);
app.use("/", postRouter);

app.listen(3005, () => {
  console.log("server is running on port 3005");
});
