import { AuthModel } from './auth.model';
import { AuthDto } from './dto/auth.dto';
import { TokenService } from '../token/token.service';
import { TokenModel } from '../token/token.model';
export declare class AuthService {
    private authModel;
    private tokenModel;
    private tokenService;
    constructor(authModel: typeof AuthModel, tokenModel: typeof TokenModel, tokenService: TokenService);
    registration(authDto: AuthDto): Promise<import("../token/dto/token.dto").TokenDto>;
    login(authDto: AuthDto): Promise<import("../token/dto/token.dto").TokenDto>;
    refresh(refreshToken: string): Promise<import("../token/dto/token.dto").TokenDto>;
    delete(token: string): Promise<void>;
}
