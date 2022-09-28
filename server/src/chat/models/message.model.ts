import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript'
import { ChatModel } from './chat.model'
@Table({ tableName: 'message' })
export class MessageModel extends Model<MessageModel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({
    type: DataType.STRING,
  })
  message: string

  @ForeignKey(() => ChatModel)
  @Column({ type: DataType.INTEGER })
  chatId: number

  @BelongsTo(() => ChatModel)
  team: ChatModel
}
