
import { Schema, model } from "mongoose"
const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    posts:[{
        type:Schema.Types.ObjectId,
        ref: "Post"
    }]
},{
    timestamps:true
})

const UserModel = model("User", UserSchema, "users");

export default UserModel;
