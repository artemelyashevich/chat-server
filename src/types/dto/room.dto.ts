export interface RoomDto {
    _id?: string,
    roomName: string,
    isGroupRoom: boolean,
    users: string[],
    latestMessage: string,
    createdAt: string,
    updatedAt: string
}