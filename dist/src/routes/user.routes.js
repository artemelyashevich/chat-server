"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new user_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/register", this.controller.register);
    }
    get gRouter() {
        return this.router;
    }
}
exports.default = new UserRoutes().gRouter;
