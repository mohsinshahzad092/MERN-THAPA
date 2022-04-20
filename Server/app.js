const dotenv = require('dotenv')
const mongoose = require('mongoose')

const express = require('express');
const User = require('./model/userSchema');
const { application } = require('express');
const app = express()

dotenv.config({ path: "./config.env" })
require('./db/conn');




const PORT = process.env.PORT;

app.use(express.json())


app.get('/', (req, res) => {

    res.send("Hellow World")
})


app.get('/contact', (req, res) => {
    res.send("mera contact")
})



app.get('/login', (req, res) => {
    res.send("Welcome to login page")
})



app.get('/signup', (req, res) => {
    res.send("Welcome to signup page")
})



app.post('/signup', async (req, res) => {
    console.log(req.body)
    const { name, email, phone, password, cpassword, cnic } = req.body

    if (!name || !email || !password || !cpassword || !cnic) {
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

app.post('/login', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    if (!email || !password) {
        return res.send("Your field is missing")
    }

    try {
        const userExist = await User.findOne({
            email: email
        })
        console.log(userExist)
        console.log(userExist?.password)

        if(userExist?.password == password) {
            return res.send("User logged In")
        } else {
            return res.send("Password not correct")

        }
    } catch (error) {
        console.log(error)
    }
})









app.listen(PORT, () => {
    console.log(`server is running port ${PORT}`)
})