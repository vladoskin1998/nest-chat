import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import { ConfigService } from '@nestjs/config';
import { PayloadToken } from '../types/types';
import { TokenModel } from './token.model';
import { TokensType } from '../types/types';
export declare class TokenService {
    private readonly jwtService;
    private configService;
    private tokenModel;
    constructor(jwtService: JwtService, configService: ConfigService, tokenModel: typeof TokenModel);
    createTokens({ id, email, role, }: PayloadToken): Promise<TokenDto>;
    verifyToken(token: string): Promise<PayloadToken | Error>;
    findToken(tokens: TokensType): Promise<TokenModel>;
    logoutUser(refreshToken: string): Promise<void>;
}
