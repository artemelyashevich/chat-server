import {RoomService} from "../services/room.service"
import {Request, Response} from "express";
import {RoomServiceImpl} from "../services/impl/room.service.impl"
import {constants as status} from "http2"


const roomService: RoomService = new RoomServiceImpl()

export class RoomController {
    public async createRoom(req: Request, res: Response): Promise<void> {
        const token: string = req.headers.authorization?.replace(/Bearer\s?/, "") || ""
        // @ts-ignore
        const room = await roomService.createRoom(req.params, token)
        res.status(status.HTTP_STATUS_CREATED).json(room)
    }

    public async getRoomById(req: Request, res: Response): Promise<void> {
        const token: string = req.headers.authorization?.replace(/Bearer\s?/, "") || ""
        // @ts-ignore
        const room = await roomService.findRoomByTitle(req.params, token)
        res.status(status.HTTP_STATUS_CREATED).json(room)
    }
}