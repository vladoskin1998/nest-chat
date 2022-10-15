import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { TokenModel } from '../token/token.model'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    SequelizeModule.forFeature([TokenModel]),
    ConfigModule.forRoot(),
    UserModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
