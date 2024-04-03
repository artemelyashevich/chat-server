import { RoomDto } from "../../types/dto/room.dto";
import {RoomService} from "../room.service";
import roomRepository from "../../entities/room"
import {UserService} from "../user.service";
import {UserServiceImpl} from "./user.service.impl";

export class RoomServiceImpl implements RoomService {
    private readonly userService: UserService

    constructor() {
        this.userService = new UserServiceImpl()
    }

    public async findRoomsByUser(token: string): Promise<RoomDto> {
        // @ts-ignore
        return await roomRepository.find({
            users: await this.userService.getCurrentUser(token)
        })
    }

}