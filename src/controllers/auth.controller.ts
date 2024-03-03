import {Request} from "express"
import {AuthService} from "../services/auth.service"
import {AuthServiceImpl} from "../services/impl/auth.service.impl"
import {ResponseBody} from "../types/response/response.type"
import {UserResponseDTO} from "../types/response/user.response.dto"

const userService: AuthService = new AuthServiceImpl()

export default class AuthController {

    public async  register(req: Request, res: ResponseBody<UserResponseDTO>): Promise<void> {
        const user: any = await userService.register(req.body)
        res.status(201).json(user)
    }

    public async login(req: Request, res: ResponseBody<UserResponseDTO>): Promise<void> {
        const user: any = await userService.login(req.body)
        res.status(201).json(user)
    }
}