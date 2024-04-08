import {RoomDto} from "../types/dto/room.dto";

export interface RoomService {
    findRoomById(id: string): Promise<RoomDto | null>

    findRoomByTitle(title: string): Promise<RoomDto | null>

    findRoomsByCurrentUser(token: string): Promise<RoomDto[] | null>

    createRoom(title: string): Promise<RoomDto | null>
}