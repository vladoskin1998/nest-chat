import { AuthModel } from './auth.model';
import { AuthDto } from './dto/auth.dto';
import { TokenService } from '../token/token.service';
export declare class AuthService {
    private authModel;
    private tokenService;
    constructor(authModel: typeof AuthModel, tokenService: TokenService);
    registration(authDto: AuthDto): Promise<import("../token/dto/token.dto").TokenDto>;
    login(authDto: AuthDto): Promise<import("../token/dto/token.dto").TokenDto>;
    refresh({ refreshToken }: {
        refreshToken?: string;
    }): Promise<import("../token/dto/token.dto").TokenDto>;
    logout(refreshToken: string): Promise<void>;
}
