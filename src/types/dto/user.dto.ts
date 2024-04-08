export interface UserDTO {
    _id?: string,
    name: string,
    email: string,
    image?: string,
    refresh_token?: string,
    password?: string,
    createdAt?: boolean | string,
    updatedAt?: boolean | string
}