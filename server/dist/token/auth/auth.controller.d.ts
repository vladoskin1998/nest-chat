import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registration(dto: UserDto, response: Response): Promise<{
        accessToken: string;
    }>;
    login(dto: UserDto, response: Response): Promise<{
        accessToken: string;
    }>;
    refresh(request: Request, response: Response): Promise<{
        accessToken: string;
    }>;
    delete(authorization: string, response: Response): Promise<void>;
}
