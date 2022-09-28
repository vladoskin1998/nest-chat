import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModel } from '../auth/auth.model'

@Module({
  imports: [SequelizeModule.forFeature([AuthModel])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
