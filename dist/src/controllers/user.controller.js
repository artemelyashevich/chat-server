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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_impl_1 = require("../services/impl/user.service.impl");
const userService = new user_service_impl_1.UserServiceImpl();
class UserController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userService.getAll();
            res.status(200).json(users);
        });
    }
    getOne(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace(/Bearer\s?/, "")) || "";
            const user = yield userService.getOne(token);
            res.status(200).json(user);
        });
    }
}
exports.UserController = UserController;
