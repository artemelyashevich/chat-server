import {IError} from "../../types/error/error.type"
import {UserCreateDto} from "../../types/request/user.request.dto"
import userRepository from "../../entities/user"
import {UserResponseDTO} from "../../types/response/user.response.dto"
import {UserService} from "../user.service"
import Token from "../../utils/JwtToken"
import {HttpStatus} from "../../utils/HttpStatus"
import {constants as status} from "http2"
import {TokenDto} from "../../types/dto/token.dto";

export class UserServiceImpl implements UserService {

    private readonly tokenService: Token

    constructor() {
        this.tokenService = new Token()
    }

    public async searchUserByName(query: string): Promise<IError | UserResponseDTO[]> {
        return userRepository.find(
            {
                "$or": [
                    {
                        name: {$regex: query}
                    }
                ]
            }
        )
    }

    public async getCurrentUser(token: string): Promise<IError | UserResponseDTO> {
        const tokenData: TokenDto = this.tokenService.getData(token)
        const user: any = await userRepository.findById(tokenData.id)
        if (!user) {
            return HttpStatus(status.HTTP_STATUS_NOT_FOUND, "Not found")
        }
        const {password, refresh_token, ...userData} = user._doc
        return userData
    }

    public async remove(id: number): Promise<void | IError> {
        throw new Error("Method not implemented.")
    }

    public async edit(data: UserCreateDto): Promise<UserResponseDTO | IError> {
        throw new Error("Method not implemented.")
    }

    public async getAll(): Promise<UserResponseDTO[]> {
        const users: any = await userRepository.find()
        const res: any = []
        users.forEach((user: { [x: string]: any; password: any; refresh_token: any; }) => {
            let {password, refresh_token, ...userData} = user._doc
            res.push(userData)
        })
        return res
    }

    public async getOneByEmail(email: string): Promise<UserResponseDTO | IError> {
        const user: any = await userRepository.findOne({
            email: email
        })
        return user;
    }

    public async removeAll(): Promise<void | IError> {
        throw new Error("Method not implemented.")
    }
}