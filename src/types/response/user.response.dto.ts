export interface UserResponseDTO {
    _id: string,
    name: string,
    email: string,
    isAdmin?: boolean,
    access_token?: string
}

export interface IToken {
    accessToken: string
}