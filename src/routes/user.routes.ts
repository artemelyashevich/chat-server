import { Router } from "express";
import { UserController } from "../controllers/user.controller";

class UserRoutes {

    private readonly router: Router
    private readonly controller: UserController

    constructor() {
        this.router = Router()
        this.controller = new UserController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get("/users", this.controller.getAll)
        this.router.get("/user", this.controller.getOne)
    }

    public get gRouter(): Router {
        return this.router
    }
}

export default new UserRoutes().gRouter