import dotenv from "dotenv"



import connectdb from "./db/db.js";



dotenv.config({
    path:  "./.env"
})
if(!process.env.MONGODB_URI){
    throw new Error("MONGODB_URL is not defined");
    
}

connectdb()