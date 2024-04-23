import {MessageDto} from "../../types/dto/message.dto"
import {MessageService} from "../message.service"
import messageRepository from "../../entities/message"


export class MessageServiceImpl implements MessageService {
    public findByRoomId = async (roomId: string): Promise<MessageDto[]> => {
        return messageRepository.find({
            roomId
        })
    }
    public create = async (messageDto: MessageDto): Promise<MessageDto> => {
        return await messageRepository.create({
            ...messageDto
        })
    }

    public remove = async (id: string): Promise<void> => {
        try {
            await messageRepository.deleteOne({_id: id})
        } catch (e) {
            console.log(e)
        }
    }
}