import {Router} from "express";
import {AuthController} from "../controllers/auth.controller";
import {MessageController} from "../controllers/message.controller";

class MessageRoutes {

    private readonly router: Router
    private readonly controller: MessageController

    constructor() {
        this.router = Router()
        this.controller = new AuthController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
    }

    public get gRouter(): Router {
        return this.router
    }
}

export default new MessageRoutes().gRouter