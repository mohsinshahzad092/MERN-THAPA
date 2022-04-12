const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    cpassword : {
        type: String,
        required : true
    },
    cnic: {
        type: Number,
        required: true
    }
})

const User = mongoose.model("STUDENT", userSchema)

module.exports = User;