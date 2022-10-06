import { ChatService } from './chat.service';
import { ChatDto, ListDto } from './dto/chat.dto';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    createChat(dto: ChatDto): Promise<{
        chatId: number;
    }>;
    listChat(dto: ListDto): Promise<import("./models/chat.model").ChatModel[]>;
}
