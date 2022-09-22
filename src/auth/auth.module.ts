import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModel } from './user.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { JwtModule } from '@nestjs/jwt'
import { TokenModel } from './token.model'
import { TokenService } from './token.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, TokenModel]),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY
    })
  ],
  providers: [AuthService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}

// console.log(process.env);
