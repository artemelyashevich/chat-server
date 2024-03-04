"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_decode_1 = require("jwt-decode");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    getAccessToken(user, session) {
        return jsonwebtoken_1.default.sign({
            id: user._id,
            session: session
        }, String(process.env.ACCESS_TOKEN_SECRET), {
            expiresIn: String(process.env.ACCESS_TOKEN_LIFE)
        });
    }
    getRefreshToken(session) {
        return jsonwebtoken_1.default.sign({
            session: session
        }, String(process.env.REFRESH_TOKEN_SECRET), {
            expiresIn: String(process.env.REFRESH_TOKEN_LIFE)
        });
    }
    getData(token) {
        const encoded = (token || "").replace(/Bearer\s?/, '');
        const decoded = (0, jwt_decode_1.jwtDecode)(encoded);
        console.log(decoded);
        return decoded;
    }
}
exports.default = Token;
