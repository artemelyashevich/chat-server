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
const http2_1 = require("http2");
const userService = new user_service_impl_1.UserServiceImpl();
class UserController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield userService.getAll();
            res.status(http2_1.constants.HTTP_STATUS_OK).json(users);
        });
        this.getCurrentUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace(/Bearer\s?/, "")) || "";
            const user = yield userService.getCurrentUser(token);
            res.status(http2_1.constants.HTTP_STATUS_OK).json(user);
        });
        this.searchUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const users = yield userService.searchUserByName(req.params.query);
            res.status(http2_1.constants.HTTP_STATUS_OK).json(users);
        });
        this.removeAllData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const token = ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.replace(/Bearer\s?/, "")) || "";
            res.status(http2_1.constants.HTTP_STATUS_NO_CONTENT);
        });
        this.editUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _c;
            const token = ((_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.replace(/Bearer\s?/, "")) || "";
            const user = yield userService.edit(token, req.body);
        });
    }
}
exports.UserController = UserController;
