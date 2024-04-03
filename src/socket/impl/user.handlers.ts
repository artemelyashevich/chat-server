import io from "socket.io";

const users: {} = {}

export const userHandlers = (io: io.Server, socket: io.Socket): void => {
    const {roomId, userId} = socket.handshake.query
    // @ts-ignore
    if (!users[roomId]) {
        // @ts-ignore
        users[roomId] = []
    }
    const updateUserList = () => {
        // @ts-ignore
        io.to(roomId).emit('user_list:update', users[roomId])
    }
    socket.on('user:add', async (user): Promise<void> => {
        // @ts-ignore
        socket.to(roomId).emit('log', `User ${userId} connected`)
        user.socketId = socket.id
        // @ts-ignore
        users[roomId].push(user)
        updateUserList()
    })
}