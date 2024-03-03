import {Router} from "express";
import AuthController from "../controllers/auth.controller";

class AuthRoutes {

    private readonly router: Router
    private readonly controller: AuthController

    constructor() {
        this.router = Router()
        this.controller = new AuthController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post("/register", this.controller.register)
        this.router.post("/login", this.controller.login)
    }

    public get gRouter(): Router {
        return this.router
    }
}

export default new AuthRoutes().gRouter