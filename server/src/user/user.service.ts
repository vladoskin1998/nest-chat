import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { FindAuthType } from '../types/types';
import { UserModel } from './user.model'
import { AuthDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  async createOrFindUser(authDto:AuthDto) {
    
    const newUser = await this.userModel.findOrCreate({
      where: { email:authDto.email },
      defaults: authDto
    })

    return newUser
  }

  async getUserByDto(param: FindAuthType ){
    return await this.userModel.findOne({
      where: param
    })
  }

  async getUsers(email?: string) {
    return await this.userModel.findAll({
      attributes: ['id', 'email'],
      where: {
        email: {
          [Op.like]: `%${email}%`,
        },
      },
    })
  }
}
