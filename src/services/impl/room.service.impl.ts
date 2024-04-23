import {RoomService} from "../room.service"
import roomRepository from "../../entities/room"
import {RoomDto} from "../../types/dto/room.dto"
import {UserService} from "../user.service";
import {UserServiceImpl} from "./user.service.impl";
import {UserResponseDTO} from "../../types/response/user.response.dto";
import {IError} from "../../types/error/error.type";

export class RoomServiceImpl implements RoomService {

    private readonly userService: UserService

    constructor() {
        this.userService = new UserServiceImpl()
    }

    findRoomsByCurrentUser = async (token: string): Promise<RoomDto[] | null> => {
        const user: UserResponseDTO | IError = await this.userService.getCurrentUser(token)
        const users = await roomRepository.find({
            usersId: {
                // @ts-ignore
                $elemMatch: {userId: user._id}
            }
        })
        return users
    }
    findRoomById = async (id: string): Promise<RoomDto | null> => {
        const user =  await roomRepository.findById(id)
        return user
    }

    findRoomByTitle = async (title: string): Promise<RoomDto | null> => {
        const user = await roomRepository.findOne({
            title: title
        })
        return user
    }

    createRoom = async (roomDto: RoomDto): Promise<RoomDto | null> => {
        await roomRepository.create(roomDto)
        return roomRepository.findOne({
            title: roomDto.title
        })
    }
}