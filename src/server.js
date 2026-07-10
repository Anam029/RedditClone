import dotenv from "dotenv"
import app from "./app.js"


import connectdb from "./db/db.js";



dotenv.config({
    path:  "./.env"
})
if(!process.env.MONGODB_URI){
    throw new Error("MONGODB_URL is not defined");
    
}
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
await connectdb()