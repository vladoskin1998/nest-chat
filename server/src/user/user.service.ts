import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { AuthModel } from '../auth/auth.model'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(AuthModel)
    private authModel: typeof AuthModel,
  ) {}
  async getUsers(email?: string) {
    return await this.authModel.findAll({
      attributes: ['id', 'email'],
      where: {
        email: {
          [Op.like]: `%${email}%`,
        },
      },
    })
  }
}
