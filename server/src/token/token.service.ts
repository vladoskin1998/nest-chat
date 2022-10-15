import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenDto } from './dto/token.dto'
import { ConfigService } from '@nestjs/config'
import { Roles } from '../enum/enum'
import { PayloadToken } from '../types/types'
import { TokenModel } from './token.model'
import { InjectModel } from '@nestjs/sequelize'
import { TokensType } from '../types/types'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel(TokenModel)
    private tokenModel: typeof TokenModel,
  ) {}

  async createTokens({
    id,
    email,
    role = Roles.USER,
  }: PayloadToken): Promise<TokenDto> {
    return {
      accessToken: this.jwtService.sign(
        { id,email, role },
        {
          expiresIn: 15,
        },
      ),
      refreshToken: this.jwtService.sign(
        { id,email, role },
        {
          expiresIn: 25,
        },
      ),
    }
  }

  async verifyToken(token: string):Promise<PayloadToken | Error> {
    try {
      const result = this.jwtService.verify<Required<PayloadToken>>(
        token,
        {
          secret: this.configService.get('JWT_SECRET_KEY'),
        },
      )
      return result 
    } catch(e) {
      return e
    }
  }

  async findToken(tokens: TokensType): Promise<TokenModel> {
    const token = await this.tokenModel.findOne({ where: tokens })

    if (!token) {
      throw new HttpException(
        'refresh or access token is not define',
        HttpStatus.BAD_REQUEST,
      )
    }

    return token
  }

  async logoutUser(refreshToken:string){
    await this.tokenModel.update(
      {accessToken: null, refreshToken:null},
      {where: {refreshToken}})
  }
}
