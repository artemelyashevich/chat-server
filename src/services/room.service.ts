import {RoomDto} from "../types/dto/room.dto";

export interface RoomService {
    findRoomsByUser(token: string): Promise<RoomDto>
}