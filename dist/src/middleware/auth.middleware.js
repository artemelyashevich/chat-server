"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const http2_1 = require("http2");
const user_service_impl_1 = require("../services/impl/user.service.impl");
dotenv_1.default.config();
const userService = new user_service_impl_1.UserServiceImpl();
class AuthMiddleware {
    tokenRequire(req, res, next) {
        var _a;
        const bearerToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace(/Bearer\s?/, "");
        if (!bearerToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(bearerToken, String(process.env.ACCESS_TOKEN_SECRET));
            // @ts-ignore
            req.body.id = decoded.id;
            next();
        }
        catch (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
    adminRequire(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const bearerToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace(/Bearer\s?/, "");
            if (!bearerToken) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(bearerToken, String(process.env.ACCESS_TOKEN_SECRET));
                // @ts-ignore
                req.body.id = decoded.id;
                // TODO: implements type
                const user = yield userService.getCurrentUser(bearerToken);
                if (user.isAdmin) {
                    next();
                }
                return res.status(http2_1.constants.HTTP_STATUS_FORBIDDEN).json({ message: "Forbidden" });
            }
            catch (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
