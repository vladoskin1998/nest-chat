import { AuthDto } from './dto/auth.dto';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private tokenService;
    private userService;
    constructor(tokenService: TokenService, userService: UserService);
    registration(authDto: AuthDto): Promise<import("../token/dto/token.dto").TokenDto>;
    login(authDto: AuthDto): Promise<import("../token/dto/token.dto").TokenDto>;
    refresh({ refreshToken }: {
        refreshToken?: string;
    }): Promise<import("../token/dto/token.dto").TokenDto>;
    logout(refreshToken: string): Promise<void>;
}
