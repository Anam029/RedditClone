import express from "express"

import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"

import userRouter from "./routes/user.router.js"
import communityRouter from "./routes/community.routes.js"


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/user",authRouter)

app.use("/api/user",userRouter)

app.use("/api/v1", communityRouter)


export default app