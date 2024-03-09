import {ChatDto} from "../types/dto/chat.dto";

export interface ChatService{
    getAll(): ChatDto[],
    create(chatDto: ChatDto): ChatDto,
}
