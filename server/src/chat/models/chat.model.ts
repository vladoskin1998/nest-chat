import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
  HasMany
} from 'sequelize-typescript'
import { AuthModel } from '../../auth/auth.model'
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

  @BelongsToMany(() => AuthModel, () => ChatUserModel)
  users: AuthModel[]

  @HasMany(() => MessageModel)
  message: MessageModel[]
}

