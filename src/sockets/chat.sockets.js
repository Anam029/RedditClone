import http from "http"
import express from "express"

const app = express()
const server = http.createServer(app)
const io = new Server(server)
server.listen(process.env.PORT || 8000)
