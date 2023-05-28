import  { Schema, model } from "mongoose"

const PostSchema = new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    title:{
        type:String,
        required:true,
        maxLength:50
    },
    text: {
        type: String,
        required:true,
    },
    rate:{
        type:Number,
        required:false,
        default:0,
        min:0,
        max:5
    }
},{timestamps:true})

const PostModel = model("Post", PostSchema, "posts");

export default PostModel;
