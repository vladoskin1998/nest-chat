import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    BelongsTo
  } from 'sequelize-typescript'
  import { UserModel } from '../../user/user.model'
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
  
    @ForeignKey(() => UserModel)
    @Column(DataType.INTEGER)
    userId: number
    @BelongsTo(() => UserModel)
    user: UserModel
  
    @ForeignKey(() => ChatModel)
    @Column(DataType.INTEGER)
    chatId: number
    @BelongsTo(() => ChatModel)
    chat: ChatModel
  }
  