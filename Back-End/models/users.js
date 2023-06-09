import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        max: 30
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false,
        default: 'user'
    },
    age: {
        type: Number,
        required: false,
        default: 0
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'postModel',
        default: []
    }]
}, { timestamps: true, strict: true })

const UserModel = mongoose.model('userModel', UserSchema, 'users')
export default UserModel