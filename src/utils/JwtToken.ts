import { jwtDecode } from "jwt-decode"
import {UserDTO} from "../types/dto/user.dto"
import jwt from 'jsonwebtoken'
import {TokenDto} from "../types/dto/token.dto";

export default class Token {

    public getAccessToken(user: UserDTO, session: number): string {
        console.log(String(process.env.ACCESS_TOKEN_SECRET))
        return jwt.sign(
            {
                id: user._id,
                session: session
            },
             String(process.env.ACCESS_TOKEN_SECRET)
            // {
            //     expiresIn: String(process.env.ACCESS_TOKEN_LIFE)
            // }
        )
    }

    public getRefreshToken(session: number): string {
        return jwt.sign(
            {
                session: session
            },
            String(process.env.REFRESH_TOKEN_SECRET),
            {
                expiresIn: String(process.env.REFRESH_TOKEN_LIFE)
            }
        )
    }

    public getData(token: string): TokenDto {
        const encoded: string = (token || "").replace(/Bearer\s?/, '')
        const decoded: TokenDto = jwtDecode(encoded)
        return decoded 
    }
}