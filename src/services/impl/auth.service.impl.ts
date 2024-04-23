import {AuthService} from "../auth.service"
import userRepository from "../../entities/user"
import {UserCreateDto} from "../../types/request/user.request.dto"
import {HttpStatus} from "../../utils/HttpStatus"
import {IError} from "../../types/error/error.type"
import CryptoJs from 'crypto-js'
import Token from "../../utils/JwtToken"
import {IToken} from "../../types/response/user.response.dto"
import {UserDTO} from "../../types/dto/user.dto"
import {config} from "dotenv"

config()

export class AuthServiceImpl implements AuthService {

    private readonly token: Token

    constructor() {
        this.token = new Token()
    }

    public login = async (data: UserCreateDto): Promise<IToken | IError> => {
        const user: UserDTO | undefined | null = await userRepository.findOne({
            email: data.email
        });
        if (!user) {
            return HttpStatus(404, "User with such email doesn't exist!");
        }
        const decryptedPassword: string = CryptoJs.AES.decrypt(
            String(user.password),
            String(process.env.CRYPTO_SECRET)
        ).toString(CryptoJs.enc.Utf8);
        if (decryptedPassword !== data.password) {
            return HttpStatus(400, "Incorrect password");
        }
        const session: number = Math.random() * 1000;
        return {accessToken: this.token.getAccessToken(user, session)};
    }

    public register = async (data: UserCreateDto): Promise<IToken | IError> => {
        const existingUser: UserDTO | undefined | null = await userRepository.findOne({
            email: data.email
        })
        if (existingUser) {
            return HttpStatus(400, "User with such email already exists!");
        }
        const encryptedPassword: string = CryptoJs.AES.encrypt(
            data.password,
            String(process.env.CRYPTO_SECRET)
        ).toString()
        const session: number = Math.random() * 1000
        await userRepository.create({
            ...data,
            password: encryptedPassword,
            refresh_token: this.token.getRefreshToken(session)
        })
        const newUser: UserDTO | undefined | null = await userRepository.findOne({
            email: data.email
        })
        if (!newUser) {
            return HttpStatus(500, "Failed to create user")
        }
        return {accessToken: this.token.getAccessToken(newUser, session)}
    }
}