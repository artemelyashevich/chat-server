import { IError } from "../../types/error/error.type"
import { UserCreateDto } from "../../types/request/user.request.dto"
import userRepository from "../../entities/user"
import { UserResponseDTO } from "../../types/response/user.response.dto"
import { UserService } from "../user.service"
import Token from "../../utils/JwtToken"
import { HttpStatus } from "../../utils/HttpStatus"


const tokenService: Token = new Token() 

export class UserServiceImpl implements UserService {
    
    public async getOne(token: string): Promise<IError | UserResponseDTO> {
        const id: string = tokenService.getData(token)
        console.log(id)
        const user: any = userRepository.findById(id)
        if (!user) {
            return HttpStatus(404, "Not found")
        }
        const {password, refresh_token, ...userData} = user
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
        throw new Error("Method not implemented.")
    }
}