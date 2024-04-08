import {RoomService} from "../services/room.service"
import {Request, Response} from "express";
import {RoomServiceImpl} from "../services/impl/room.service.impl"
import {constants as status} from "http2"


const roomService: RoomService = new RoomServiceImpl()

export class RoomController {
    public async createRoom(req: Request, res: Response): Promise<void> {
        const token: string = req.headers.authorization?.replace(/Bearer\s?/, "") || ""
        const room = await roomService.createRoom(req.body)
        res.status(status.HTTP_STATUS_CREATED).json(room)
    }

    public async getRoomByTitle(req: Request, res: Response): Promise<void> {
        const room = await roomService.findRoomByTitle(req.params.title)
        res.status(status.HTTP_STATUS_OK).json(room)
    }

    public async getRoomById(req: Request, res: Response): Promise<void> {
        const room = await roomService.findRoomById(req.params.id)
        res.status(status.HTTP_STATUS_OK).json(room)
    }

    public async getRoomsByCurrentUser(req: Request, res: Response): Promise<void> {
        const token: string = req.headers.authorization?.replace(/Bearer\s?/, "") || ""
        const rooms = await roomService.findRoomsByCurrentUser(token)
        res.status(status.HTTP_STATUS_OK).json(rooms)
    }
}