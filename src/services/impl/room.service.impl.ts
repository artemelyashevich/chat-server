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
        return await roomRepository.find({
            'usersId': {
                // @ts-ignore
                $in: user._id
            }
        })
    }

    findRoomById = async (id: string): Promise<RoomDto | null> => {
        return await roomRepository.findById(id)
    }

    findRoomByTitle = async (title: string): Promise<RoomDto | null> => {
        return await roomRepository.findOne({
            title: title
        })
    }

    createRoom = async (roomDto: RoomDto): Promise<RoomDto | null> => {
        await roomRepository.create(roomDto)
        return roomRepository.findOne({
            title: roomDto.title
        })
    }
}