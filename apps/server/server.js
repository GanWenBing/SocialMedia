require("dotenv").config();
const express = require("express");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express();
const cookieParser = require("cookie-parser")
const cors = require('cors');
const multer = require('multer')
const PORT = process.env.PORT || 3000

const userRouter = require('./routes/user')
// const roomRouter = require('./routes/room')
// const postRouter = require('./routes/post')
// const groupchatRouter = require('./routes/groupchat')
// const friendRouter = require("./routes/friend")
const postsRouter = require('./routes/posts')
const relationshipRouter = require("./routes/relationship")
const commentRouter = require("./routes/comment")
const likeRouter = require("./routes/like")


app.use(cors())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use(cookieParser())
app.use(express.json())
app.use("/api", userRouter)
//app.use("/api", roomRouter)
//app.use("/api", postRouter)
//app.use("/api", groupchatRouter)
//app.use("/api", friendRouter)
app.use("/api", postsRouter)
app.use("/api", relationshipRouter)
app.use("/api", commentRouter)
app.use("/api", likeRouter)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });