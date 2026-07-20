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
         minlength: 8,
        
    
    },
    
    refreshToken:{
      type: String,

    }

},{timestamps: true})

const User = mongoose.model("User",userSchema)

export {User}