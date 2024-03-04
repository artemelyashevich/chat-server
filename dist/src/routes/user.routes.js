"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new user_controller_1.UserController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/users", this.controller.getAll);
        this.router.get("/user", this.controller.getOne);
    }
    get gRouter() {
        return this.router;
    }
}
exports.default = new UserRoutes().gRouter;
