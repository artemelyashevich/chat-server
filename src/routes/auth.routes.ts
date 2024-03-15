import {Router} from "express"
import {AuthController} from "../controllers/auth.controller"
import {AuthValidation} from "../validators/auth.validation"
import handleValidate from "../validators"

class AuthRoutes {

    private readonly router: Router
    private readonly controller: AuthController
    private readonly validator: AuthValidation

    constructor() {
        this.router = Router()
        this.controller = new AuthController()
        this.validator = new AuthValidation()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post("/register", handleValidate, this.validator.signUpValidation, this.controller.register)
        this.router.post("/login", handleValidate, this.validator.signInValidation, this.controller.login)
    }

    public get gRouter(): Router {
        return this.router
    }
}

export default new AuthRoutes().gRouter