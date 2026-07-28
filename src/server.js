import dotenv from "dotenv"
import app from "./app.js"
import {createServer} from "http"
import connectdb from "./db/db.js";
import { Server } from "socket.io";

import dns from "dns"

dns.setServers(["1.1.1.1", "8.8.8.8"])

dotenv.config({
    path:  "./.env"
})
if(!process.env.MONGODB_URI){
    throw new Error("MONGODB_URL is not defined");
    
}

await connectdb()

const server = createServer(app)
const io = new Server (server);






server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});