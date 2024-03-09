export interface MessageDto {
    _id?: string,
    sender: string,
    content: string,
    chat: string,
    readBy: string[],
    createdAt?: boolean | string,
    updatedAt?: boolean | string
}