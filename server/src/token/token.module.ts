import { Module,Global } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TokenService } from './token.service'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { TokenModel } from './token.model'
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({}),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
    SequelizeModule.forFeature([TokenModel]),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
