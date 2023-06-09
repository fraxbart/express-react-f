import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import UsersRoute from './routes/users.js'
import loginRoute from './routes/login.js'
import postRoute from './routes/posts.js'
import dotenv from 'dotenv'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path'
import sendEmail from './routes/sendEmail.js'

dotenv.config()

const PORT = 5050;

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname,'./uploads')))

//middleware Globali utilizzati per tutte le rotte
app.use(express.json());
app.use(cors()); //abilita il server a ricevere richieste da qualsiasi origine

app.use('/', UsersRoute)
app.use('/', loginRoute)
app.use('/', postRoute)
app.use('/', sendEmail)

mongoose.connect('mongodb+srv://fra:6pxDk2Zb1ZoFY6M4@frank94444.ft2eyzn.mongodb.net/')
    .then(() => {console.log("db connected")})
    .catch(error => console.log(error))

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Errore di connessione al DB'))
db.once('open', () => { console.log('DDB connesso correttamente') })

app.listen(PORT, () => console.log(`Server avviato sulla porta ${PORT}`))
