import {Router} from "express"
import {UserController} from "../controllers/user.controller"
import {AuthMiddleware} from "../middleware/auth.middleware"

class UserRoutes {

    private readonly router: Router
    private readonly controller: UserController
    private readonly auth: AuthMiddleware

    constructor() {
        this.router = Router()
        this.controller = new UserController()
        this.auth = new AuthMiddleware()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get("/users", this.controller.getAll)
        this.router.get("/user", this.controller.getCurrentUser)
        this.router.delete("/users", this.auth.tokenRequire, this.controller.removeAllData)
    }

    public get gRouter(): Router {
        return this.router
    }
}

export default new UserRoutes().gRouter