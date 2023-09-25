import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import { insertUser, checkUsername, readUser } from './operations.js'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()



mongoose.connect(process.env.DATABASE,{
    
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const screen1Model = mongoose.model('screen1',{
    seatno:{type:Number},
    status:{type:String}
})
const screen2Model = mongoose.model('screen2',{
    seatno:{type:Number},
    status:{type:String}
})
const screen3Model = mongoose.model('screen3',{
    seatno:{type:Number},
    status:{type:String}
})
const moviesModel = mongoose.model('movies',{
    name:{type:String},
    rate:{type:Number},
    screenNo:{type:Number}
})

var screen1Res
screen1Model.find()
.then(function(output){
    screen1Res = output
})
.catch(function (err){
    console.log(err)
})

var screen2Res
screen2Model.find()
.then(function(output){
    screen2Res = output
})
.catch(function (err){
    console.log(err)
})

var screen3Res
screen3Model.find()
.then(function(output){
    screen3Res = output
})
.catch(function (err){
    console.log(err)
})

var moviesRes
moviesModel.find()
.then(function(output){
    moviesRes = output
})
.catch(function (err){
    console.log(err)
})



app.set('view engine', 'hbs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/cinema', (req, res) => {
    res.render('cinema',{
        movies:moviesRes,
        screen1:screen1Res,
        screen2:screen2Res,
        screen3:screen3Res
    })
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const rows = await readUser(username);
        
        const user = rows[0];

        if (rows.length === 0) {
            res.status(200).json({ success: false, message: 'Invalid Username' });
        }

        else if (password != user.password) {
            res.status(200).json({ success: false, message: 'Invalid Username or Password' });
        }
        else {
            res.status(200).json({ success: true, message: 'Login  successful' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

});

app.get('/register', (req, res) => {
    res.render("registration")
})

app.post('/register', async (req, res) => {
    const { username, name, password } = req.body;

    try {
        const result = await checkUsername(username);

        if (result > 0) {
            res.status(200).json({ success: false, message: 'Username is already occupied' });
        } else {
            try {
                await insertUser(username, name, password);
                res.status(200).json({ success: true, message: 'Registration successful' });
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.listen(process.env.PORT ||3000,()=>{
    console.log("listening...")
})