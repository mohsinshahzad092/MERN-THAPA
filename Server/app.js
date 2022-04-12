const dotenv = require('dotenv')
const mongoose = require('mongoose')

const express = require('express');
const User = require('./userSchema');
const { application } = require('express');
const app = express()

dotenv.config({path:"./config.env"})

const Port = 3000;

const DB = "mongodb+srv://mernthapa:mernthapa@cluster0.oqrjj.mongodb.net/mernstack?retryWrites=true&w=majority"

mongoose.connect(DB).then(() => {
    console.log("connection done")

}).catch((err) => {
    console.log("connection not done")
    console.log(err)
})

app.use(express.json())

app.get('/', (req, res) => {

    res.send("Hellow World")
})

app.get('/profile', (req, res)=> {
    res.send("teri profile")
})



app.get('/login', (req, res) => {
    res.send("Welcome to login page")
})



app.get('/signup', (req, res) => {
    res.send("Welcome to signup page")
})



app.post('/signup', async (req, res) => {
    const { name, email, phone, password, cpassword, cnic } = req.body

    if(!name || !email || !password || !cpassword || !cnic) {
        return res.send("Your data is incomplete")
    }

    try {
        const user = new User({
            name, email, phone, password, cpassword, cnic
        })

        const userRegister = await user.save()

        if (userRegister) {
            res.send("User Registered")
        } else {
            res.send("User not registered")
        }

    } catch (error) {
        console.log(error)
    }



})












app.listen(Port, () => {
    console.log(`server is running port ${Port}`)
})