import {UserResponseDTO} from "../types/response/user.response.dto"
import {Request, Response} from "express"
import { UserServiceImpl } from "../services/impl/user.service.impl"
import { UserService } from "../services/user.service"
import {ResponseBody} from "../types/response/response.type"
import { IError } from "../types/error/error.type"
import {constants as status} from "http2"
import {UserCreateDto} from "../types/request/user.request.dto";

const userService: UserService = new UserServiceImpl()

export class UserController {

    public getAll = async (req: Request, res: ResponseBody<UserResponseDTO[]>): Promise<void> => {
        const users = await userService.getAll() 
        res.status(status.HTTP_STATUS_OK).json(users)
    }

    public getCurrentUser = async (req: Request, res: ResponseBody<UserResponseDTO | IError>): Promise<void> =>{
        const token: string = req.headers.authorization?.replace(/Bearer\s?/, "") || ""
        const user = await userService.getCurrentUser(token)
        res.status(status.HTTP_STATUS_OK).json(user)
    }

    public searchUsers = async (req: Request, res: ResponseBody<UserResponseDTO[] | IError>): Promise<void> => {
        // @ts-ignore
        const users = await userService.searchUserByName(req.params.query)
        res.status(status.HTTP_STATUS_OK).json(users)
    }

    public removeAllData= async (req: Request, res: Response): Promise<void> => {
        const token: string = req.headers.authorization?.replace(/Bearer\s?/, "") || ""
        res.status(status.HTTP_STATUS_NO_CONTENT)
    }

    public editUser = async (req: Request, res: ResponseBody<UserCreateDto>): Promise<void> => {
        const token: string = req.headers.authorization?.replace(/Bearer\s?/, "") || ""
        const user = await userService.edit(token, req.body)
    }
}