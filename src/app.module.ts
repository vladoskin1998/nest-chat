import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { UserModel } from './auth/user.model'
import { AuthModule } from './auth/auth.module'
import { TokenModel } from './auth/token.model'

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.HOST_DB,
      port: Number(process.env.PORT_DB),
      username: 'nest',
      password: 'Vlados1998',
      database: 'testdb',
      models: [UserModel, TokenModel],
      autoLoadModels: true,
    }),
    AuthModule,
  ],
  exports: [ConfigModule]
})
export class AppModule {}

//console.log(process.env);