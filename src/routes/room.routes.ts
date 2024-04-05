import {Router} from "express";
import {RoomController} from "../controllers/room.controller";
import {AuthMiddleware} from "../middleware/auth.middleware";

class RoomRoutes {

    private readonly router: Router
    private readonly controller: RoomController
    private readonly auth: AuthMiddleware

    constructor() {
        this.router = Router()
        this.controller = new RoomController()
        this.auth = new AuthMiddleware()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get("/room", this.auth.tokenRequire, this.controller.getRoomById)
        this.router.post("/room", this.auth.tokenRequire, this.controller.createRoom)
    }

    public get gRouter(): Router {
        return this.router
    }
}

export default new RoomRoutes().gRouter