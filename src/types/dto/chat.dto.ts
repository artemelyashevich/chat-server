export interface ChatDto {
    _id: string,
    chatName: string,
    isGroupChat: boolean,
    users: string[],
    latestMessage: string,
    groupAdmin: string,
    createdAt?: boolean | string,
    updatedAt?: boolean | string
}