import { ChatDto } from "../../types/dto/chat.dto";
import {ChatService} from "../chatService";

export class ChatServiceImpl implements ChatService {
    getAll(): ChatDto[] {
        throw new Error("Method not implemented.");
    }
    create(chatDto: ChatDto): ChatDto {
        throw new Error("Method not implemented.");
    }

}