import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthModel } from './auth.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { TokenModel } from '../token/token.model'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    SequelizeModule.forFeature([AuthModel, TokenModel]),
    ConfigModule.forRoot(),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
