import express from "express"
import usersRouter from "./routes/users.js";
import mongoose from "mongoose";
import loginRouter from "./routes/login.js"
import postsRouter from "./routes/posts.js"
import cors from "cors"

const port = 5050;

const app = express();

mongoose.connect('mongodb+srv://fra:6pxDk2Zb1ZoFY6M4@frank94444.ft2eyzn.mongodb.net/')
    .then(() => {console.log("db connected")})
    .catch(error => console.log(error))


app.use(express.json())

app.use(cors());

app.use("/", loginRouter);

app.use("/users", usersRouter);

app.use("/posts", postsRouter)

app.listen(port, () => {
    console.log("server running on port: " + port)
})
