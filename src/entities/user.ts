import {Schema, model} from "mongoose"
import {UserDTO} from "../types/dto/user.dto";

const userSchema = new Schema<UserDTO>({
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
    refresh_token: {
        type: String,
        required: true
    }
})

export default model<UserDTO>("Users", userSchema)