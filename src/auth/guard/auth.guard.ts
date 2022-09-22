import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import { TokenService } from '../token.service'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from '../user.model'
import { Request } from 'express'
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const token = request.headers?.authorization
    
    if (!token) {
      throw new HttpException("Request don`t have authorization header", HttpStatus.BAD_REQUEST)
    }

    return this.authByAccessToken(token)
  }

  async authByAccessToken(token: string): Promise<boolean> {
    
    const {email} = await this.tokenService.verifyToken(token)

    const user = await this.userModel.findOne({
      where: { email },
    })

    if (!user) {
      throw new HttpException("DB don`t find user", HttpStatus.BAD_REQUEST)
    }

    const userToken = await user.$get('tokens')

    return userToken.accessToken === token
  }
}


