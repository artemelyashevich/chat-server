import {RoomDto} from "../types/dto/room.dto";
import {IError} from "../types/error/error.type";

export interface RoomService {
    findRoomById(id: string): Promise<RoomDto | null>

    findRoomByTitle(title: string): Promise<RoomDto | null>

    findRoomsByCurrentUser(token: string): Promise<RoomDto[] | null>

    createRoom(roomDto: RoomDto): Promise<RoomDto | null | IError>
}