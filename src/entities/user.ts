import {Schema, model} from "mongoose"
import {UserDTO} from "../types/dto/user.dto";

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
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
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
    },
    {
        timestamps: true
    }
)

export default model<UserDTO>("Users", userSchema)