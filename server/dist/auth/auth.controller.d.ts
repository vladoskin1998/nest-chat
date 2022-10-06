import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registration(dto: AuthDto, response: Response): Promise<{
        accessToken: string;
    }>;
    login(dto: AuthDto, response: Response): Promise<{
        accessToken: string;
    }>;
    refresh(request: Request, response: Response): Promise<{
        accessToken: string;
    }>;
    logout(request: Request, response: Response): Promise<void>;
}
