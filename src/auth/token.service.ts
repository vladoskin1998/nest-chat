import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenDto } from './dto/token.dto'
import { ConfigService } from '@nestjs/config'
import { Roles } from '../enum/enum'
import { PayloadToken } from '../types/types'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createTokens({
    email,
    role = Roles.USER,
  }: PayloadToken): Promise<TokenDto> {
    return {
      accessToken: this.jwtService.sign(
        { email, role },
        {
          expiresIn: 335,
        },
      ),
      refreshToken: this.jwtService.sign(
        { email, role },
        {
          expiresIn: 535,
        },
      ),
    }
  }

  async verifyToken(token: string) {
    // console.log('token', token)
    try {
      const tokenPayload = this.jwtService.verify<Required<PayloadToken>>(
        token,
        {
          secret: this.configService.get('JWT_SECRET_KEY'),
        },
      )
      return tokenPayload
    } catch {
      throw new HttpException('Bad token', HttpStatus.UNAUTHORIZED)
    }
  }
}
