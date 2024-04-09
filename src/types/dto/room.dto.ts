export interface RoomDto {
    _id?: string,
    title: string,
    usersId: string[],
    creatorId: string[],
    createdAt: string,
    updatedAt: string
}