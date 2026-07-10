import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectdb = async () => {
    try {
        
       const connection = await mongoose.connect(`${process.env.MONGODB_URI}`)
       console.log(`${connection}`)
        console.log(`\n MONGODB connection ${connection.connection.host}`)
        
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR", error)
        
    }
}

export default connectdb
