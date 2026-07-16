import {createServer} from "http"
import app from "./app.js"
import { Server } from "socket.io"

const server = createServer(app)
const io = new Server(server)

io.on("connection",(socket) =>{
    console.log("User connected")
})

io.on("connection", (socket) => {
    console.log(socket.id);
});