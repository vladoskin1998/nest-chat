import { UserModel } from './user.model';
import { UserDto } from './dto/user.dto';
import { TokenService } from './token.service';
import { TokenModel } from './token.model';
export declare class AuthService {
    private userModel;
    private tokenModel;
    private tokenService;
    constructor(userModel: typeof UserModel, tokenModel: typeof TokenModel, tokenService: TokenService);
    registration(userDto: UserDto): Promise<import("./dto/token.dto").TokenDto>;
    login(userDto: UserDto): Promise<import("./dto/token.dto").TokenDto>;
    refresh(refreshToken: string): Promise<import("./dto/token.dto").TokenDto>;
    delete(token: string): Promise<void>;
}
