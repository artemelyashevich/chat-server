import {UserResponseDTO} from "../types/response/user.response.dto"
import {Request} from "express"
import { UserServiceImpl } from "../services/impl/user.service.impl"
import { UserService } from "../services/user.service"
import {ResponseBody} from "../types/response/response.type"
import { IError } from "../types/error/error.type"

const userService: UserService = new UserServiceImpl()

export class UserController {

    public async getAll(req: Request, res: ResponseBody<UserResponseDTO[]>): Promise<void> {
        const users = await userService.getAll() 
        res.status(200).json(users)
    }

    public async getOne(req: Request, res: ResponseBody<UserResponseDTO | IError>): Promise<void> {
        const token: string = req.headers.authorization?.replace(/Bearer\s?/, "") || ""
        const user = await userService.getOne(token)
        res.status(200).json(user)
    }
}