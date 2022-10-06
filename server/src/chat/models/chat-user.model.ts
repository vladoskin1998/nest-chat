import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    BelongsTo
  } from 'sequelize-typescript'
  import { AuthModel } from '../../auth/auth.model'
  import { ChatModel } from './chat.model';
    
  @Table({ tableName: 'chat_users' })
  export class ChatUserModel extends Model {
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number
  
    @ForeignKey(() => AuthModel)
    @Column(DataType.INTEGER)
    userId: number
    @BelongsTo(() => AuthModel)
    user: AuthModel
  
    @ForeignKey(() => ChatModel)
    @Column(DataType.INTEGER)
    chatId: number
    @BelongsTo(() => ChatModel)
    chat: ChatModel
  }
  