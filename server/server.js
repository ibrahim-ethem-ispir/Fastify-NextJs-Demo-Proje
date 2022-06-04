const fastify = require('fastify')({ logger: true })
const dotenv = require("dotenv").config({path:"./src/config/.env"})
const port = process.env.PORT || 3003
const routes = require("./src/router/authRouter")
const swagger = require("./src/config/swagger")
fastify.register(require("fastify-swagger"), swagger.options)
fastify.register(require('fastify-cors'))


require("./src/config/database")
fastify.get("/", async (request, reply) => {
    return {hello : "World"}
})

routes.forEach((route, index) => {
    fastify.route(route)
})

const start = async () => {
    try {
        await fastify.listen(port)
            .then(() => {
                fastify.swagger()
                console.log(`Server ${port} Connection Successful`);
            })
            .catch((err) => {
                console.log("Server Connection Error");
            })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()