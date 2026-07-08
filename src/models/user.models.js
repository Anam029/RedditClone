import mongoose,{Schema} from "mongoose"



const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true,
    },email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        
    },password:{
        type: String,
        required: [true,"Password is required"],
        
    }, avatar:{
        type: String,   //Cloundinary url  
        required: true,
    },refreshtoken:{
      type: String,

    }

},{timestamps: true})

const User = mongoose.Model("User",userSchema)

export {User}