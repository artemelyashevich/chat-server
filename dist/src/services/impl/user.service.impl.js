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
const JwtToken_1 = __importDefault(require("../../utils/JwtToken"));
const HttpStatus_1 = require("../../utils/HttpStatus");
const http2_1 = require("http2");
class UserServiceImpl {
    constructor() {
        this.tokenService = new JwtToken_1.default();
    }
    searchUserByName(query) {
        throw new Error("Method not implemented.");
    }
    getCurrentUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = this.tokenService.getData(token);
            const user = yield user_1.default.findById(tokenData.id);
            if (!user) {
                return (0, HttpStatus_1.HttpStatus)(http2_1.constants.HTTP_STATUS_NOT_FOUND, "Not found");
            }
            const _a = user._doc, { password, refresh_token } = _a, userData = __rest(_a, ["password", "refresh_token"]);
            return userData;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    edit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.default.find();
            const res = [];
            users.forEach((user) => {
                let _a = user._doc, { password, refresh_token } = _a, userData = __rest(_a, ["password", "refresh_token"]);
                res.push(userData);
            });
            return res;
        });
    }
    getOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({
                email: email
            });
            return user;
        });
    }
    removeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
}
exports.UserServiceImpl = UserServiceImpl;
