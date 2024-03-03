"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
class Server {
    constructor(app) {
        this.PORT = Number(process.env.PORT) || 8000;
        this.app = app;
        this.config();
        new routes_1.default(this.app);
    }
    config() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        mongoose_1.default
            .connect(String(process.env.MONGODB_URI))
            .then(() => console.log('Connected to mongodb'))
            .catch((err) => console.log(err));
    }
    start() {
        this.app.listen(this.PORT, () => console.log(`http://localhost:${this.PORT}`));
    }
}
exports.default = Server;
