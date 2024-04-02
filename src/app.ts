import express, {Application} from "express"
import cors from "cors"
import dotenv from "dotenv"
import Routes from "./routes";
import {errorHandler, notFound} from "./middleware/error.middleware"
import {Config} from "./config";
import * as http from "http";
import io from 'socket.io'
import {log} from "node:util";

dotenv.config()

export default class Server {

    private readonly app: Application
    private readonly PORT: number = Number(process.env.PORT) || 8000
    private readonly configService: Config
    private readonly server: http.Server
    private readonly io: io.Server

    constructor(app: Application) {
        this.app = app
        this.configService = new Config()
        this.config()
        this.server = http.createServer(this.app)
        this.io = new io.Server(this.server, {
            cors: {
                origin: String(process.env.ALLOWED_HOST)
            }
        })
        this.onSocketConnect()
        new Routes(this.app)
    }

    private config(): void {
        this.app.use(cors({
            origin: String(process.env.ALLOWED_HOST)
        }))
        this.app.use(express.json())
        // this.app.use(notFound)
        this.app.use(errorHandler)
        this.configService.connectToDB()
    }

    public start(): void {
        this.server.listen(this.PORT, () => console.log(`http://localhost:${this.PORT}`))
    }

    private onSocketConnect(): void {
        this.io.on("connection", (socket) => {
            console.log("User connected")
            socket.on("send_message", (message: {text: string}) => console.log("TEXT: ", message))
        })
    }
}