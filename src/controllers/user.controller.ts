import {UserResponseDTO} from "../types/response/user.response.dto"
import {Request, Response} from "express"
import { UserServiceImpl } from "../services/impl/user.service.impl"
import { UserService } from "../services/user.service"
import {ResponseBody} from "../types/response/response.type"
import { IError } from "../types/error/error.type"
import {constants as status} from "http2"


const userService: UserService = new UserServiceImpl()

export class UserController {

    public async getAll(req: Request, res: ResponseBody<UserResponseDTO[]>): Promise<void> {
        const users = await userService.getAll() 
        res.status(status.HTTP_STATUS_OK).json(users)
    }

    public async getCurrentUser(req: Request, res: ResponseBody<UserResponseDTO | IError>): Promise<void> {
        const token: string = req.headers.authorization?.replace(/Bearer\s?/, "") || ""
        const user = await userService.getCurrentUser(token)
        res.status(status.HTTP_STATUS_OK).json(user)
    }

    public async removeAllData(req: Request, res: Response): Promise<void> {
        const token: string = req.headers.authorization?.replace(/Bearer\s?/, "") || ""
        console.log(`\t ${req.body}`)
        //await userService.removeAll()
        res.status(status.HTTP_STATUS_NO_CONTENT)
    }
}