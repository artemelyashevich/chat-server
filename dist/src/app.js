"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const config_1 = require("./config");
dotenv_1.default.config();
class Server {
    constructor(app) {
        this.PORT = Number(process.env.PORT) || 8000;
        this.app = app;
        this.configService = new config_1.Config();
        this.config();
        new routes_1.default(this.app);
    }
    config() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        // this.app.use(notFound)
        this.app.use(error_middleware_1.errorHandler);
        this.configService.connectToDB();
    }
    start() {
        this.app.listen(this.PORT, () => console.log(`http://localhost:${this.PORT}`));
    }
}
exports.default = Server;
