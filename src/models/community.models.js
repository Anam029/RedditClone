import mongoose, {Schema} from "mongoose";

const communitySchema = new Schema({
    name: {
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    displayname:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,

    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    moderators:[{
        type: Schema.Types.ObjectId,
        ref:"User"
    },],
    members:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }], isPrivate:[{
        type:  Boolean,
        default: false,
        rules:[
            
            "Be grateful",
            
        
    ]

    }]



},{timestamps:true})


export const Community = mongoose.model("Community",communitySchema)