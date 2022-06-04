const users = require("../model/userModel")
const boom = require("boom")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const createError = require("http-errors")

const allUsers = async (req, reply) => {
    try {
        const _foundUsers = await users.find()
        return _foundUsers
    } catch (err) {
        console.log("tüm kayıtlar getirilirken hata çıktı === " + err);
        throw boom.boomify(err)
    }
}


const singleUser = async (req, reply) => {
    try {
        const userId = req.params.userId
        const user = await users.findById(userId)
        return user
    } catch (err) {
        throw boom.boomify(err)
    }
}

const registerPost = async (req, reply) => {
    try {
        reply.header("Access-Control-Allow-Origin", "*");
        reply.header("Access-Control-Allow-Methods", "POST");
        const addUser = new users({
            userName: req.body.userName,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        })


        return await addUser.save()
    } catch (err) {
        throw boom.boomify(err)
    }
}


const loginPost = async (req, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "POST");
    try {
        const user = await users.login(req.body.userName, req.body.password)
        const token = await user.generateToken()
        
        reply.send({
            user:user,
            token:token
        })
        //return "Logged in User === "+ user.userName
    } catch (err) {
        throw createError(err);
    }
}

module.exports = {
    allUsers,
    singleUser,
    registerPost,
    loginPost
}
