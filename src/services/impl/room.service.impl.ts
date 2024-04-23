import {RoomService} from "../room.service"
import roomRepository from "../../entities/room"
import {RoomDto} from "../../types/dto/room.dto"
import {UserService} from "../user.service";
import {UserServiceImpl} from "./user.service.impl";
import {UserResponseDTO} from "../../types/response/user.response.dto";
import {IError} from "../../types/error/error.type";
import {HttpStatus} from "../../utils/HttpStatus";
import {constants as status} from "http2"

export class RoomServiceImpl implements RoomService {

    private readonly userService: UserService

    constructor() {
        this.userService = new UserServiceImpl()
    }

    findRoomsByCurrentUser = async (token: string): Promise<RoomDto[] | null> => {
        const user: UserResponseDTO | IError = await this.userService.getCurrentUser(token)
        return  roomRepository.find({
            usersId: {
                // @ts-ignore
                $elemMatch: {userId: user._id}
            }
        })
    }
    findRoomById = async (id: string): Promise<RoomDto | null> => {
        return roomRepository.findById(id)
    }

    findRoomByTitle = async (title: string): Promise<RoomDto | null> => {
        return roomRepository.findOne({
            title: title
        })
    }

    createRoom = async (roomDto: RoomDto): Promise<RoomDto | null | IError> => {
        try {
            await roomRepository.create(roomDto)
        } catch (e) {
            return HttpStatus(status.HTTP_STATUS_INTERNAL_SERVER_ERROR, 'Something went wrong...')
        }
        return roomRepository.findOne({
            title: roomDto.title
        })
    }
}