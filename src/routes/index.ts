import {Application} from "express"
import authRoutes from "./auth.routes"
import userRoutes from "./user.routes"
import messageRoutes from "./message.routes";
import chatRoutes from "./chat.routes";

export default class Routes {
    constructor(app: Application) {
        app.use
        (
            authRoutes,
            userRoutes,
            messageRoutes,
            chatRoutes
        )
    }
}