import {Router} from "express";
import {ChatController} from "../controllers/chat.controller";

class ChatRoutes {

    private readonly router: Router
    private readonly controller: ChatController

    constructor() {
        this.router = Router()
        this.controller = new ChatController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {

    }

    public get gRouter(): Router {
        return this.router
    }
}

export default new ChatRoutes().gRouter