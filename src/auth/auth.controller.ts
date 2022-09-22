import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  UseGuards,
  Headers,
  Delete,
  Get,
} from '@nestjs/common'
import { Response, Request } from 'express'
import { AuthService } from './auth.service'
import { UserDto } from './dto/user.dto'
import { AuthGuard } from './guard/auth.guard'
import { RolesGuard } from './guard/role.guard'
import { RoleMetadata} from './guard/role.metadata'
import { Roles } from '../enum/enum'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  async registration(
    @Body() dto: UserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.registration(dto)

    response.cookie('refreshToken', tokens.refreshToken)

    return { accessToken: tokens.accessToken }
  }

  @Post('/login')
  async login(
    @Body() dto: UserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(dto)

    response.cookie('refreshToken', tokens.refreshToken)

    return { accessToken: tokens.accessToken }
  }

  @Post('/refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = request.cookies

    const newToken = await this.authService.refresh(refreshToken)

    response.cookie('refreshToken', newToken.refreshToken)

    return { accessToken: newToken.accessToken }
  }

  @UseGuards(AuthGuard)
  @Delete('/delete')
  async delete(
    @Headers('Authorization') authorization: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.delete(authorization)
    response.clearCookie('refreshToken')
    response.status(204)
  }

 
  @UseGuards(AuthGuard)
  @RoleMetadata(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @Get('/users')
  async getUser() {
    const users = await this.authService.getUsers()
    return users
  }
}
