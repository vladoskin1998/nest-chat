import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
  HasMany
} from 'sequelize-typescript'
import { UserModel } from '../../user/user.model'
import { ChatUserModel } from './chat-user.model'
import { MessageModel } from './message.model'

@Table({ tableName: 'chat' })
export class ChatModel extends Model<ChatModel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @BelongsToMany(() => UserModel, () => ChatUserModel)
  users: UserModel[]

  @HasMany(() => ChatUserModel)
  chatUserId: ChatUserModel[]

  @HasMany(() => MessageModel)
  message: MessageModel[]
}

