import io from "socket.io"
import {SocketService} from "../socket.service"
import {messageHandlers} from "./message.handlers";
import {userHandlers} from "./user.handlers";

export class SocketServiceImpl implements SocketService {
    private readonly io: io.Server

    constructor(io: io.Server) {
        this.io = io
    }

     public onSocketConnect = (): void => {
        this.io.on("connection", (socket: io.Socket): void => {
            this.onConnection(socket)
        })
    }

    private onConnection = (socket: io.Socket): void => {
        const {roomId, userId} = socket.handshake.query
        //@ts-ignore
        socket.join(roomId)
        messageHandlers(this.io, socket)
        userHandlers(this.io, socket)
    }
}