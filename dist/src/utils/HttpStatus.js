"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatus = void 0;
const HttpStatus = (status, message) => {
    return {
        status: status,
        message: message
    };
};
exports.HttpStatus = HttpStatus;
