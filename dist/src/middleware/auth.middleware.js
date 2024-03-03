"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    const bearerToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace(/Bearer\s?/, "");
    if (!bearerToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(bearerToken, String(process.env.TOKEN_SECRET));
        req.body._id = {
            // @ts-ignore
            _id: decoded.id
        };
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.authMiddleware = authMiddleware;
