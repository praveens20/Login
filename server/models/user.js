const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:'Please enter email',
        unique:true
    },
    password:{
        type: String,
        required:'Please enter password'
    },
    fullName:{
        type: String,
        required:'Please enter fullName'
    },
    location:{
        type: String,
        required:'Please enter location'
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    otp:{
        type: String,
        default: ''
    }
}, { versionKey : false });

const User = mongoose.model('user',userSchema);

module.exports = User;