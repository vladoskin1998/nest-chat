import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { AuthModel } from './auth.model'
import { AuthDto } from './dto/auth.dto'
import * as bcrypt from 'bcrypt'
import { TokenService } from '../token/token.service'
import { TokenModel } from '../token/token.model'
import { Roles } from 'src/enum/enum'
import { Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel)
    private authModel: typeof AuthModel,
    private tokenService: TokenService,
  ) {}

  async registration(authDto: AuthDto) {
    const { email } = authDto
    const role = authDto?.role || Roles.USER

    const newUser = await this.authModel.findOrCreate({
      where: { email },
      defaults: {
        ...authDto,
        password: bcrypt.hashSync(authDto.password, 4),
      },
    })

    if (!newUser[1]) {
      throw new HttpException('user already created', HttpStatus.BAD_REQUEST)
    }

    const createdUser = newUser[0]

    const tokens = await this.tokenService.createTokens({ id:createdUser.id, email, role })

    await createdUser.$create('tokens', tokens)

    return tokens
  }

  async login(authDto: AuthDto) {
    const { email, password } = authDto

    const user = await this.authModel.findOne({ where: { email } })

    if (!user) {
      throw new HttpException('can not find user', HttpStatus.BAD_REQUEST)
    }

    const checkPassword = bcrypt.compare(password, user.password)

    if (!checkPassword) {
      throw new HttpException('bad password', HttpStatus.BAD_REQUEST)
    }

    const tokens = await this.tokenService.createTokens({
      id: user.id,
      email,
      role: user.role,
    })

    const oldToken = await user.$get('tokens')

    await oldToken.update(tokens)

    return tokens
  }

  async refresh({ refreshToken }:{ refreshToken?: string }) {

    // console.log('refreshToken------>', refreshToken);
    
    if (!refreshToken) {
      throw new HttpException('not authorization', HttpStatus.UNAUTHORIZED)
    }

    const token = await this.tokenService.findToken({ refreshToken })

    const verifyToken = await this.tokenService.verifyToken(refreshToken)

    if (verifyToken instanceof Error) {
      throw new HttpException('not authorization', HttpStatus.UNAUTHORIZED)
    }

    const { id, email, role } = await token.$get('user')

    const newToken = await this.tokenService.createTokens({ id, email, role })

    await token.update(newToken)

    return newToken
  }

  async logout(refreshToken:string): Promise<void> {
    await this.tokenService.logoutUser(refreshToken)
  }

}
