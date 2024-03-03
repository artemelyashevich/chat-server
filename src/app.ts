import express, {Application} from "express"
import cors from "cors"
import mongoose from 'mongoose'
import dotenv from "dotenv"
import Routes from "./routes";

dotenv.config()

export default class Server {

    private readonly app: Application
    private readonly PORT: number = Number(process.env.PORT) || 8000

    constructor(app: Application) {
        this.app = app
        this.config()
        new Routes(this.app)
    }

    private config(): void {
        this.app.use(cors())
        this.app.use(express.json())
        mongoose
            .connect(String(process.env.MONGODB_URI))
            .then(() => console.log('Connected to mongodb'))
            .catch((err) => console.log(err))
    }

    public start(): void {
        this.app.listen(this.PORT, () => console.log(`http://localhost:${this.PORT}`))
    }
}