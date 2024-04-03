import io from "socket.io";
import {throws} from "node:assert";
import {MessageService} from "../../services/message.service";
import {MessageServiceImpl} from "../../services/impl/message.service";
import {MessageDto} from "../../types/dto/message.dto";

const messages = {}

export const messageHandlers = (io: io.Server, socket: io.Socket): void => {
    const messageService: MessageService = new MessageServiceImpl()
    const {roomId} = socket.handshake.query
    const updateMessageList = (): void => {
        // @ts-ignore

        io.to(roomId).emit('message_list:update',
            // @ts-ignore
            messages[roomId])
    }

    socket.on('message:get',
        async (): Promise<void> => {
            try {
                // @ts-ignore
                messages[roomId] = await messageService.findByRoom(roomId)
                updateMessageList()
            } catch (e) {
                console.log(e)
            }
        })
    socket.on('message:add', async (message: MessageDto): Promise<void> => {
        await messageService.create(message)
        message.createdAt = String(Date.now())
        // @ts-ignore
        messages[roomId].push(message)
        updateMessageList()
    })
    socket.on('message:remove', (message: MessageDto): void => {
        const {_id: id} = message
        // @ts-ignore
        messages[roomId] = messages[roomId].filter((m: MessageDto) => m._id !== id)
        updateMessageList()
    })
}