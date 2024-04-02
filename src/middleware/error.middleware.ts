import {NextFunction, Request, Response} from "express"

// @TODO: implements error handling
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
    const error: Error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    const statusCode: number = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: error.message
    })
}