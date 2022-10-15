import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import * as bcrypt from 'bcrypt'
import { TokenService } from '../token/token.service'
import { Roles } from 'src/enum/enum'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  async registration(authDto: AuthDto) {
    const { email } = authDto
    const role = authDto?.role || Roles.USER

    const newUser = await this.userService.createOrFindUser(
      {
        ...authDto, password: bcrypt.hashSync(authDto.password, 3),
      }
    )

    const [user, isCreated] = newUser

    if (!isCreated) {
      throw new HttpException('user already created', HttpStatus.BAD_REQUEST)
    }

    const tokens = await this.tokenService.createTokens({
      id: user.id,
      email,
      role,
    })

    await user.$create('tokens', tokens)

    return tokens
  }

  async login(authDto: AuthDto) {
    const { email, password } = authDto

    const user = await this.userService.getUserByDto({email})

    if (!user) {
      throw new HttpException('can not find user', HttpStatus.BAD_REQUEST)
    }

    const checkPassword = await bcrypt.compare(password, user.password)

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

  async refresh({ refreshToken }: { refreshToken?: string }) {
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

  async logout(refreshToken: string): Promise<void> {
    await this.tokenService.logoutUser(refreshToken)
  }
}
