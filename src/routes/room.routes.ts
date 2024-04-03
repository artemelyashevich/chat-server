import {Router} from "express";
import {RoomController} from "../controllers/room.controller";

class RoomRoutes {
    private readonly router: Router
    private readonly controller: RoomController

    constructor() {
        this.router = Router()
        this.controller = new RoomController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
    }

    public get gRouter(): Router {
        return this.router
    }
}

export default new RoomRoutes().gRouter