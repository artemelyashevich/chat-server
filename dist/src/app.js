"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const http = __importStar(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const socket_service_impl_1 = require("./socket/impl/socket.service.impl");
dotenv_1.default.config();
class Server {
    constructor(app) {
        this.PORT = Number(process.env.PORT) || 8000;
        this.app = app;
        this.configService = new config_1.Config();
        this.config();
        this.server = http.createServer(this.app);
        this.io = new socket_io_1.default.Server(this.server, {
            cors: {
                origin: String(process.env.ALLOWED_HOST)
            }
        });
        this.socketService = new socket_service_impl_1.SocketServiceImpl(this.io);
        this.socketService.onSocketConnect();
        new routes_1.default(this.app);
    }
    config() {
        this.app.use((0, cors_1.default)( /*{
            origin: String(process.env.ALLOWED_HOST)
        }*/));
        this.app.use(express_1.default.json());
        this.app.use(error_middleware_1.errorHandler);
        this.configService.connectToDB();
    }
    start() {
        this.server.listen(this.PORT, () => console.log(`http://localhost:${this.PORT}`));
    }
}
exports.default = Server;
