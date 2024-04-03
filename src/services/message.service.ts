import {MessageDto} from "../types/dto/message.dto"

export interface MessageService {
    create(messageDto: MessageDto): Promise<MessageDto>

    remove(id: string): Promise<void>

    findByRoomId(roomId: string): Promise<MessageDto[]>
}