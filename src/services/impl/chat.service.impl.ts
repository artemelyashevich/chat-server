import { ChatDto } from "../../types/dto/chat.dto";
import {ChatService} from "../chat.service";

export class ChatServiceImpl implements ChatService {
    getAll(): ChatDto[] {
        throw new Error("Method not implemented.");
    }
    create(chatDto: ChatDto): ChatDto {
        throw new Error("Method not implemented.");
    }

}