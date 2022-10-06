import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import { TokenService } from '../../token/token.service'
import { InjectModel } from '@nestjs/sequelize'
import { AuthModel } from '../auth.model'
import { Request } from 'express'
@Injectable()
export class AuthHttpGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    @InjectModel(AuthModel)
    private authModel: typeof AuthModel,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const tokenAccess = request.headers?.authorization
    
    if (!tokenAccess) {
      throw new HttpException("Request don`t have authorization header", HttpStatus.BAD_REQUEST)
    }

    return this.authByAccessToken(tokenAccess)
  }

  async authByAccessToken(token: string): Promise<boolean> {
    
    const payload = await this.tokenService.verifyToken(token)

    if(payload instanceof Error){
      throw new HttpException("UNAUTHORIZED, Bad token", HttpStatus.UNAUTHORIZED)
    }

    const {email} = payload
    
    const user = await this.authModel.findOne({
      where: { email },
    })

    if (!user) {
      throw new HttpException("DB don`t find user", HttpStatus.BAD_REQUEST)
    }

    const userToken = await user.$get('tokens')

    return userToken.accessToken === token
  }
}


