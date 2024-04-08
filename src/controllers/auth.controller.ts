import {Request} from "express"
import {AuthService} from "../services/auth.service"
import {AuthServiceImpl} from "../services/impl/auth.service.impl"
import {ResponseBody} from "../types/response/response.type"
import {IToken, UserResponseDTO} from "../types/response/user.response.dto"
import {IError} from "../types/error/error.type";


const authService: AuthService = new AuthServiceImpl()

export class AuthController {
    public async  register(req: Request, res: ResponseBody<IToken | IError>): Promise<void> {
        const token: IToken | IError | undefined = await authService.register(req.body)
        res.status(201).json(token)
    }

    public async login(req: Request, res: ResponseBody<IToken | IError>): Promise<void> {
        const token: IToken | IError | undefined = await authService.register(req.body)
        // @ts-ignore
        if (token.status) {
            // @ts-ignore
            res.status(token.status).json({message: token.message})
        }
        else {
            res.status(201).json(token)
        }
    }
}