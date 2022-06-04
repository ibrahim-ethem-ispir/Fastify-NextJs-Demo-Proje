const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const createError = require("http-errors")
const customError = createError( "ERROR_CODE", "message" )
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        require:true,
        trim: true
    },
    email:{
        type: String,
        require:true,
        unique:true,
        trim: true
    },
    password:{
        type: String,
        require: true,
        trim:true
    }
},{collection:"users" ,timestamps: true})

userSchema.statics.login = async (userName, password) => {
    const user = await users.findOne({userName: userName})

    if (!user) {
        throw createError(400, "Username or Password is incorrect")
    }

    const passwordCheck = await bcrypt.compare(password, user.password)

    if(!passwordCheck) {
        throw createError(400,"the password is incorrect")
    }

    return user
}


userSchema.methods.generateToken = async () => {
    const loggedInUser = this
    const token = await jwt.sign({_id:loggedInUser._id},process.env.LOGIN_SECRET_KEY,{expiresIn: process.env.LOGIN_EXPIRES})
    return token

}

const users = mongoose.model("users",userSchema)

module.exports = users