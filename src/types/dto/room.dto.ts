export interface RoomDto {
    _id?: string,
    title: string,
    usersId: [{userId: string}],
    creatorId: string[],
    createdAt: string,
    updatedAt: string
}