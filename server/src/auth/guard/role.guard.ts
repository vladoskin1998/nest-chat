import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Roles } from '../../enum/enum'
import { Reflector } from '@nestjs/core'
import { TokenService } from '../../token/token.service'
import { Request } from 'express'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Roles[]>('roles', context.getHandler())

    if (!roles) {
      return true
    }

    const request: Request = context.switchToHttp().getRequest()
    const token = request.headers.authorization
    const payload= await this.tokenService.verifyToken(token)

    if(payload instanceof Error){
      throw new HttpException("UNAUTHORIZED, Bad token", HttpStatus.UNAUTHORIZED)
    }

    const { role } = payload
    if (!roles.includes(role)) {
      throw new HttpException('No access right', HttpStatus.FORBIDDEN)
    }

    return true
  }
}
