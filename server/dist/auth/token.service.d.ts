import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import { ConfigService } from '@nestjs/config';
import { PayloadToken } from '../../types/types';
export declare class TokenService {
    private readonly jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    createTokens({ email, role, }: PayloadToken): Promise<TokenDto>;
    verifyToken(token: string): Promise<PayloadToken>;
}
