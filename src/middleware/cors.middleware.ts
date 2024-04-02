import {Request, Response, NextFunction} from "express"

export const allowCrossDomain = (req: Request, res: Response, next: NextFunction): void => {
    res.header(`Access-Control-Allow-Origin`, `http://127.0.0.1:5173/`)
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE,PATCH`)
    res.header(`Access-Control-Allow-Headers`, `Content-Type`)
    next()
}