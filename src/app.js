import express from "express"

import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"

import userRouter from "./routes/user.router.js"
import communityRouter from "./routes/community.routes.js"
import postRouter from "./routes/post.routers.js"
import commentRouter from "./routes/comments.routes.js"
import votesRouter from "./routes/votes.routers.js"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/user",authRouter)

app.use("/api/user",userRouter)

app.use("/api/v1", communityRouter)

app.use("/api/post",postRouter)

app.use("/api/comment",commentRouter)

app.use("/api/vote",votesRouter)

export default app