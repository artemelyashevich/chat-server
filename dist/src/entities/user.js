"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: process.env.DEFAULT_IMAGE_URL
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    refresh_token: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Users", userSchema);
