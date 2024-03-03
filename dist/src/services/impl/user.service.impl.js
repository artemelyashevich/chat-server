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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceImpl = void 0;
const user_1 = __importDefault(require("../../entities/user"));
const HttpStatus_1 = require("../../utils/HttpStatus");
const crypto_js_1 = __importDefault(require("crypto-js"));
const JwtToken_1 = __importDefault(require("../../utils/JwtToken"));
const token = new JwtToken_1.default();
class UserServiceImpl {
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({
                email: data.email
            });
            if (user === null) {
                return (0, HttpStatus_1.HttpStatus)(404, "User with such email doesn't exist!");
            }
            const decPassword = crypto_js_1.default
                .AES
                .decrypt(String(user.password), String(process.env.CRYPTO_SECRET));
            const pass = decPassword.toString(crypto_js_1.default.enc.Utf8);
            if (pass !== data.password) {
                return (0, HttpStatus_1.HttpStatus)(400, "Incorrect password");
            }
            const _a = user._doc, { password, refresh_token } = _a, userData = __rest(_a, ["password", "refresh_token"]);
            const session = Math.random() * 1000;
            return Object.assign(Object.assign({}, userData), { access_token: token.getAccessToken(user, session) });
        });
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let u = yield user_1.default.findOne({
                email: data.email
            });
            if (u !== null) {
                return (0, HttpStatus_1.HttpStatus)(400, "User with such email already exist!");
            }
            const hashPassword = crypto_js_1.default
                .AES
                .encrypt(data.password, String(process.env.CRYPTO_SECRET))
                .toString();
            const session = Math.random() * 1000;
            yield user_1.default.create(Object.assign(Object.assign({}, data), { password: hashPassword, refresh_token: token.getRefreshToken(session) }));
            const user = yield user_1.default.findOne({
                email: data.email
            });
            const _a = user._doc, { password, refresh_token } = _a, userData = __rest(_a, ["password", "refresh_token"]);
            return Object.assign(Object.assign({}, userData), { access_token: token.getAccessToken(user, session) });
        });
    }
}
exports.UserServiceImpl = UserServiceImpl;
