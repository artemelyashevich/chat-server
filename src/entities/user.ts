import {Schema, model} from "mongoose"
import {UserDTO} from "../types/dto/user.dto"
import {config} from "dotenv"

config()

const userSchema = new Schema<UserDTO>(
    {
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
        refresh_token: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default model<UserDTO>("Users", userSchema)