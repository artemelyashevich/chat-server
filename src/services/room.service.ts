import {RoomDto} from "../types/dto/room.dto";

export interface RoomService {
    findRoomByTitle(title: string, token: string): Promise<RoomDto | null>

    createRoom(title: string, token: string): Promise<RoomDto | null>
}