"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const message_routes_1 = __importDefault(require("./message.routes"));
const room_routes_1 = __importDefault(require("./room.routes"));
class Routes {
    constructor(app) {
        app.use(auth_routes_1.default, user_routes_1.default, message_routes_1.default, room_routes_1.default);
    }
}
exports.default = Routes;
