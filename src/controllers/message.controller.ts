import {MessageService} from "../services/message.service";
import {MessageServiceImpl} from "../services/impl/message.service";

const messageService: MessageService = new MessageServiceImpl()

export class MessageController {}