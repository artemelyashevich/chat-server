import express, {Application} from 'express'
import Server from "./src/app"

const app: Application = express()
const server: Server = new Server(app)

server.start()