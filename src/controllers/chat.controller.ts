import {ChatService} from "../services/chat.service";
import {ChatServiceImpl} from "../services/impl/chat.service.impl";

const chatService: ChatService = new ChatServiceImpl()

export class ChatController{}