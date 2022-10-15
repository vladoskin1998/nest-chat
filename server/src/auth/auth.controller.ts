import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  Delete,
} from '@nestjs/common'
import { Response, Request } from 'express'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
// import { RolesGuard } from './guard/role.guard'
// import { RoleMetadata} from './guard/role.metadata'
// import { Roles } from '../enum/enum'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  async registration(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.registration(dto)

    response.cookie('refreshToken', tokens.refreshToken)

    return { accessToken: tokens.accessToken }
  }

  @Post('/login')
  async login(
    @Body() dto: AuthDto,
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
    
    const newToken = await this.authService.refresh(request.cookies)

    response.cookie('refreshToken', newToken.refreshToken)

    return { accessToken: newToken.accessToken }
  }

  @Delete('/logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    
    const refreshToken = request.cookies['refreshToken']

    await this.authService.logout(refreshToken)

    response.clearCookie('refreshToken')
    response.status(204)

  }
}
