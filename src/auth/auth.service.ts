import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from './user.model'
import { UserDto } from './dto/user.dto'
import * as bcrypt from 'bcrypt'
import { TokenService } from './token.service'
import { TokenModel } from './token.model'
import { Roles } from 'src/enum/enum'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    @InjectModel(TokenModel)
    private tokenModel: typeof TokenModel,
    private tokenService: TokenService,
  ) {}

  async registration(userDto: UserDto) {

    const { email } = userDto
    const role = userDto?.role || Roles.USER

    const newUser = await this.userModel.findOrCreate({
      where: { email },
      defaults: {
        ...userDto,
        password: bcrypt.hashSync(userDto.password, 4),
      },
    })

    if (!newUser[1]) {
      throw new HttpException('user already created', HttpStatus.BAD_REQUEST)
    }
 
    const tokens = await this.tokenService.createTokens({ email, role })

    await newUser[0].$create('tokens', tokens)

    return tokens
  }

  async login(userDto: UserDto) {
    const { email, password } = userDto

    const user = await this.userModel.findOne({ where: { email } })

    if (!user) {
      throw new HttpException('can not find user', HttpStatus.BAD_REQUEST)
    }

    const checkPassword = bcrypt.compare(password, user.password)

    if (!checkPassword) {
      throw new HttpException('bad password', HttpStatus.BAD_REQUEST)
    }

    const tokens = await this.tokenService.createTokens({
      email,
      role: user.role,
    })

    const oldToken = await user.$get('tokens')

    await oldToken.update(tokens)

    return tokens
  }

  async refresh(refreshToken: string) {
    const token = await this.tokenModel.findOne({ where: { refreshToken } })

    if (!token) {
      throw new HttpException('refresh token is absent', HttpStatus.BAD_REQUEST)
    }

    const verifyToken = await this.tokenService.verifyToken(refreshToken)

    // console.log('verifyToken--->', verifyToken)

    if (!verifyToken) {
      throw new HttpException('not authorization', HttpStatus.UNAUTHORIZED)
    }

    const { email, role } = await token.$get('user')

    const newToken = await this.tokenService.createTokens({ email, role })

    await token.update(newToken)

    return newToken
  }

  async delete(token: string): Promise<void> {
    const { email } = await this.tokenService.verifyToken(token)

    // console.log('email---->', email)

    await this.userModel.destroy({ where: { email: email } })
  }

  async getUsers() {
    return await this.userModel.findAll()
  }
}
