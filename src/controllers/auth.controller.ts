import {Request} from "express"
import {AuthService} from "../services/auth.service"
import {AuthServiceImpl} from "../services/impl/auth.service.impl"
import {ResponseBody} from "../types/response/response.type"
import {IToken, UserResponseDTO} from "../types/response/user.response.dto"
import {IError} from "../types/error/error.type";
import {constants as status} from "http2"


const authService: AuthService = new AuthServiceImpl()

export class AuthController {
    public register = async (req: Request, res: ResponseBody<IToken | IError>): Promise<void> => {
        const token: IToken | IError | undefined = await authService.register(req.body)
        // @ts-ignore
        if (token.status){
            // @ts-ignore
            res.status(token.status).json({message: token.message})
            return
        }
        res.status(status.HTTP_STATUS_CREATED).json(token)
    }

    public login = async (req: Request, res: ResponseBody<IToken | IError>): Promise<void> => {
        const token: IToken | IError | undefined = await authService.login(req.body)
        // @ts-ignore
        if (token.status) {
            // @ts-ignore
            res.status(token.status).json({message: token.message})
        } else {
            res.status(status.HTTP_STATUS_CREATED).json(token)
        }
    }
}