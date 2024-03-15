import express, {Application} from "express"
import cors from "cors"
import dotenv from "dotenv"
import Routes from "./routes";
import {errorHandler, notFound} from "./middleware/error.middleware"
import {Config} from "./config";

dotenv.config()

export default class Server {

    private readonly app: Application
    private readonly PORT: number = Number(process.env.PORT) || 8000
    private readonly configService: Config

    constructor(app: Application) {
        this.app = app
        this.configService = new Config()
        this.config()
        new Routes(this.app)
    }

    private config(): void {
        this.app.use(cors())
        this.app.use(express.json())
        // this.app.use(notFound)
        this.app.use(errorHandler)
        this.configService.connectToDB()
    }

    public start(): void {
        this.app.listen(this.PORT, () => console.log(`http://localhost:${this.PORT}`))
    }
}