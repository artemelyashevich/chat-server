import {UserResponseDTO} from "../../types/response/user.response.dto";
import {AuthService} from "../auth.service";
import userRepository from "../../entities/user";
import {UserCreateDto} from "../../types/request/user.request.dto";
import {HttpStatus} from "../../utils/HttpStatus";
import {IError} from "../../types/error/error.type";
import CryptoJs from 'crypto-js'
import Token from "../../utils/JwtToken";
import {UserDTO} from "../../types/dto/user.dto";

const token = new Token()

export class AuthServiceImpl implements AuthService {
    public async login(data: UserCreateDto): Promise<UserResponseDTO | IError> {
        const user: UserDTO | any = await userRepository.findOne({
            email: data.email
        })

        if (user === null) {
            return HttpStatus(404, "User with such email doesn't exist!")
        }

        const decPassword: CryptoJs.lib.WordArray  = CryptoJs
            .AES
            .decrypt(String(user.password), String(process.env.CRYPTO_SECRET))

        const pass = decPassword.toString(CryptoJs.enc.Utf8)

        if (pass !== data.password) {
            return HttpStatus(400, "Incorrect password")
        }

        const {password, refresh_token,  ...userData} = user._doc

        const session: number = Math.random() * 1000

        return {...userData, access_token: token.getAccessToken(user, session)}
    }

    public async register(data: UserCreateDto): Promise<UserResponseDTO | IError> {
        let u = await userRepository.findOne({
            email: data.email
        })

        if (u !== null) {
            return HttpStatus(400, "User with such email already exist!")
        }

        const hashPassword: string = CryptoJs
            .AES
            .encrypt(data.password, String(process.env.CRYPTO_SECRET))
            .toString()

        const session: number = Math.random() * 1000

        await userRepository.create({...data, password: hashPassword, refresh_token: token.getRefreshToken(session)})

        const user: UserDTO | any = await userRepository.findOne({
            email: data.email
        })

        const {password, refresh_token, ...userData} = user._doc

        return {...userData, access_token: token.getAccessToken(user, session)}
    }
}