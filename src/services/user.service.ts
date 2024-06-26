import { IError } from "../types/error/error.type"
import { UserCreateDto } from "../types/request/user.request.dto"
import { UserResponseDTO } from "../types/response/user.response.dto"

export interface UserService {
    remove(id: number): Promise<void | IError>

    edit(token: string, data: UserCreateDto): Promise<UserResponseDTO | IError>

    getAll(): Promise<UserResponseDTO[]>

    getOneByEmail(email: string): Promise<UserResponseDTO | IError>

    getCurrentUser(token: string): Promise<UserResponseDTO | IError>

    searchUserByName(query: string): Promise<UserResponseDTO[] | IError>

    removeAll(): Promise<void | IError>
}