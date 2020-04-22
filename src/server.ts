import * as fastify from "fastify"
import { Server, IncomingMessage, ServerResponse } from "http"
import * as mongoose from 'mongoose'
import * as db from 'config/database'
import apiRoutes from 'routes/api'

class App{
    private options:fastify.ServerOptions
    public server: fastify.FastifyInstance<Server,IncomingMessage,ServerResponse>
    public port:number
    constructor(){
        mongoose.connect(db.mongodb_connection, db.mongodb_options)
        mongoose.connection.on("error", error => {
            console.error(error);
        })
        this.server = fastify(this.options)
        this.port = Number(process.env.FASTIFY_PORT) || 3000
        this.server.register(apiRoutes, {prefix:"/api"})
        this.server.listen(this.port)
    }
}
const app:App = new App()
console.log('====================================')
console.log('             SERVER NAME')
console.log('               VERSION ')
console.log('------------------------------------')
console.log(` Server running on port ${app.port}`)
console.log('====================================')