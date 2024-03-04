import {UserResponseDTO} from "../types/response/user.response.dto"
import {UserCreateDto} from "../types/request/user.request.dto"
import {IError} from "../types/error/error.type"

export interface AuthService {
    register(data: UserCreateDto): Promise<UserResponseDTO | IError>

    login(data: UserCreateDto): Promise<UserResponseDTO | IError>
}