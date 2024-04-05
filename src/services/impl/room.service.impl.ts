import {RoomService} from "../room.service"
import roomRepository from "../../entities/room"
import {RoomDto} from "../../types/dto/room.dto"
import {UserService} from "../user.service";
import {UserServiceImpl} from "./user.service.impl";

export class RoomServiceImpl implements RoomService {

    private readonly userService: UserService

    constructor() {
        this.userService = new UserServiceImpl()
    }

    findRoomByTitle = async (title: string, token: string): Promise<RoomDto | null> => {
        const user: any = await this.userService.getCurrentUser(token)
        const cTitle = title + user._id
        return roomRepository.findOne({
            title: cTitle
        });
    }

    createRoom = async (title: string, token: string): Promise<RoomDto | null> => {
        const user: any = await this.userService.getCurrentUser(token)
        const cTitle = title + user._id
        await roomRepository.create({title: cTitle})
        return roomRepository.findOne({
            title: cTitle
        })
    }
}