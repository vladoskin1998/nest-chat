import {
  Column,
  Model,
  Table,
  DataType,
  HasOne,
  Default,
  BelongsToMany,
  HasMany
} from 'sequelize-typescript'
import { TokenModel } from '../token/token.model'
import { Roles } from '../enum/enum'
import { UserCreationAttrs } from '../types/types'
import { ChatModel } from '../chat/models/chat.model'
import { ChatUserModel } from '../chat/models/chat-user.model'

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING })
  email: string

  @Column({ type: DataType.STRING })
  password: string

  @Default(Roles.USER)
  @Column({ type: DataType.ENUM({ values: Object.values(Roles) }) })
  role: Roles

  @HasOne(() => TokenModel)
  tokens: TokenModel

  @BelongsToMany(() => ChatModel, () => ChatUserModel)
  chats: ChatModel[]

  @HasMany(() => ChatUserModel)
  chatUserId: ChatUserModel[]
}
