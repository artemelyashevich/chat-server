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

    public searchUserByName = async (query: string): Promise<IError | UserResponseDTO[]> => {
        const user = await userRepository.find(
            {
                "$or": [
                    {
                        name: {$regex: query}
                    }
                ]
            }
        )
        return user
    }

    public getCurrentUser = async (token: string): Promise<IError | UserResponseDTO> => {
        const tokenData: TokenDto = this.tokenService.getData(token)
        const user: any = await userRepository.findById(tokenData.id)
        if (!user) {
            return HttpStatus(status.HTTP_STATUS_NOT_FOUND, "Not found")
        }
        const {password, refresh_token, ...userData} = user._doc
        return userData
    }

    public remove = async (id: number): Promise<void | IError> => {
        throw new Error("Method not implemented.")
    }

    public edit = async (token: string, data: UserCreateDto): Promise<UserResponseDTO | IError> => {
        const user = await this.getCurrentUser(token)
        await userRepository.updateOne({
            // @ts-ignore
            _id: user?._id
        }, data)
        return await this.getCurrentUser(token)
    }

    public getAll = async (): Promise<UserResponseDTO[]> => {
        const users: any = await userRepository.find()
        const res: any = []
        users.forEach((user: { [x: string]: any; password: any; refresh_token: any; }) => {
            let {password, refresh_token, ...userData} = user._doc
            res.push(userData)
        })
        return res
    }

    public getOneByEmail = async (email: string): Promise<UserResponseDTO | IError> => {
        const user: any = await userRepository.findOne({
            email: email
        })
        return user;
    }

    public removeAll = async (): Promise<void | IError> => {
        throw new Error("Method not implemented.")
    }
}