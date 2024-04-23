import {RoomService} from "../services/room.service"
import {Request, Response} from "express";
import {RoomServiceImpl} from "../services/impl/room.service.impl"
import {constants as status} from "http2"
import {RoomDto} from "../types/dto/room.dto";
import {IError} from "../types/error/error.type";


const roomService: RoomService = new RoomServiceImpl()

export class RoomController {
    public createRoom = async (req: Request, res: Response): Promise<void> => {
        const room: RoomDto | null | IError = await roomService.createRoom(req.body)
        // @ts-ignore
        if (room.status) {
            // @ts-ignore
            res.status(room.status).json({message: room.message})
            return
        }
        res.status(status.HTTP_STATUS_CREATED).json(room)
    }

    public getRoomByTitle = async (req: Request, res: Response): Promise<void> => {
        const room = await roomService.findRoomByTitle(req.params.title)
        if (!room) {
            res.status(status.HTTP_STATUS_NOT_FOUND)
            return
        }
        res.status(status.HTTP_STATUS_OK).json(room)
    }

    public getRoomById = async (req: Request, res: Response): Promise<void> => {
        const room = await roomService.findRoomById(req.params.id)
        if (!room) {
            res.status(status.HTTP_STATUS_NOT_FOUND)
            return
        }
        res.status(status.HTTP_STATUS_OK).json(room)
    }

    public getRoomsByCurrentUser = async (req: Request, res: Response): Promise<void> => {
        const token: string = req.headers.authorization?.replace(/Bearer\s?/, "") || ""
        const rooms = await roomService.findRoomsByCurrentUser(token)
        if (!rooms) {
            res.status(status.HTTP_STATUS_NOT_FOUND)
            return
        }
        res.status(status.HTTP_STATUS_OK).json(rooms)
    }
}