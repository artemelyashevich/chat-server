import { NextFunction, Request, Response } from "express"
import jwt, {JwtPayload} from "jsonwebtoken"
import dotenv from "dotenv"
import {constants as status} from "http2"
import {UserService} from "../services/user.service"
import {UserServiceImpl} from "../services/impl/user.service.impl"
import {IError} from "../types/error/error.type";
import {UserResponseDTO} from "../types/response/user.response.dto";

dotenv.config()

const userService: UserService = new UserServiceImpl()

export class AuthMiddleware {
    public tokenRequire(req: Request, res: Response, next: NextFunction) {
        const bearerToken: string | undefined = req.headers.authorization?.replace(/Bearer\s?/, "")

        if (!bearerToken) {
            return res.status(401).json({message: "Unauthorized"})
        }
        try {
            const decoded: string | JwtPayload = jwt.verify(bearerToken, String(process.env.ACCESS_TOKEN_SECRET))
            // @ts-ignore
            req.body.id = decoded.id
            next()
        }
        catch (err) {
            return res.status(401).json({message: "Unauthorized"})
        }
    }

    public async adminRequire(req: Request, res: Response, next: NextFunction) {
        const bearerToken: string | undefined = req.headers.authorization?.replace(/Bearer\s?/, "")
        if (!bearerToken) {
            return res.status(401).json({message: "Unauthorized"})
        }
        try {
            const decoded: string | JwtPayload = jwt.verify(bearerToken, String(process.env.ACCESS_TOKEN_SECRET))
            // @ts-ignore
            req.body.id = decoded.id
            // TODO: implements type
            const user: any = await userService.getCurrentUser(bearerToken)
            if (user.isAdmin) {
                next()
            }
            return res.status(status.HTTP_STATUS_FORBIDDEN).json({message: "Forbidden"})
        }
        catch (err) {
            return res.status(401).json({message: "Unauthorized"})
        }
    }
}