import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModel } from './user.model'

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
