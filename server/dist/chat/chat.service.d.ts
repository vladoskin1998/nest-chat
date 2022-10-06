import { ChatModel } from './models/chat.model';
import { ChatUserModel } from './models/chat-user.model';
import { AuthModel } from 'src/auth/auth.model';
import { ChatDto } from './dto/chat.dto';
export declare class ChatService {
    private chatModel;
    private chatUserModel;
    private authModel;
    constructor(chatModel: typeof ChatModel, chatUserModel: typeof ChatUserModel, authModel: typeof AuthModel);
    newChat({ usersId }: ChatDto): Promise<number>;
    listChat({ userId }: {
        userId: any;
    }): Promise<AuthModel>;
}
