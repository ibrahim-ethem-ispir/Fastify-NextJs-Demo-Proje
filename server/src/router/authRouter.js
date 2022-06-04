const authController = require("../controller/authController")
const authMiddleware = require("../middleware/authMiddleware")
const users = require("../model/userModel")

const routes = [
    {
        method: "GET",
        url: "/api/users",
        handler: authController.allUsers
    },
    {
        method: "GET",
        url: "/api/user/:userId",
        handler: authController.singleUser
    },
    {
        method: "POST",
        url: "/api/register",
        handler: authController.registerPost,
        schema: users
    },
    {
        method: "POST",
        url: "/api/login",
        handler: authController.loginPost
    }

]

module.exports = routes