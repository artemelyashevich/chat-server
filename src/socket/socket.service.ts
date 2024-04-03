import io from "socket.io";

export interface SocketService {
    onSocketConnect(): void
}