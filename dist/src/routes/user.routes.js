"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new user_controller_1.UserController();
        this.auth = new auth_middleware_1.AuthMiddleware();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/users", this.controller.getAll);
        this.router.get("/user", this.controller.getCurrentUser);
        this.router.delete("/users", this.auth.tokenRequire, this.controller.removeAllData);
    }
    get gRouter() {
        return this.router;
    }
}
exports.default = new UserRoutes().gRouter;
