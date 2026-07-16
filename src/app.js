import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"

import userRouter from "./routes/user.router.js"
import communityRouter from "./routes/community.routes.js"
import postRouter from "./routes/post.routers.js"
import commentRouter from "./routes/comments.routes.js"
import votesRouter from "./routes/votes.routers.js"
import notificationRouter from "./routes/notification.routers.js"
import chatsRouter from "./routes/chats.routes.js"
const app = express();

app.use(
    cors({
        origin: 
        " http://localhost:5173",
        credentials: true
    })
)


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/user",authRouter)

app.use("/api/user",userRouter)

app.use("/api/v1", communityRouter)

app.use("/api/post",postRouter)

app.use("/api/comment",commentRouter)

app.use("/api/vote",votesRouter)

app.use("/api/notification",notificationRouter)

app.use("/api/chats",chatsRouter)

export default app