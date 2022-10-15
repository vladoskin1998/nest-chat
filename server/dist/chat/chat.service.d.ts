import { ChatModel } from './models/chat.model';
import { ChatUserModel } from './models/chat-user.model';
import { UserModel } from 'src/user/user.model';
import { ChatDto, ListDto } from './dto/chat.dto';
import { TargetChat, AddMessage } from '../types/types';
import { MessageModel } from './models/message.model';
export declare class ChatService {
    private chatModel;
    private chatUserModel;
    private userModel;
    private messageModel;
    constructor(chatModel: typeof ChatModel, chatUserModel: typeof ChatUserModel, userModel: typeof UserModel, messageModel: typeof MessageModel);
    newChat({ destinationUserId, sourceUserId, }: ChatDto): Promise<TargetChat>;
    listChat({ sourceUserId }: ListDto): Promise<UserModel>;
    getChatHistory(chatId: string): Promise<MessageModel[]>;
    addMessage(payload: AddMessage): Promise<void>;
}
