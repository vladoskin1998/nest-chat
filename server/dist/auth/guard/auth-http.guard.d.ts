import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from '../../token/token.service';
import { UserService } from '../../user/user.service';
export declare class AuthHttpGuard implements CanActivate {
    private tokenService;
    private userService;
    constructor(tokenService: TokenService, userService: UserService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    authByAccessToken(accessToken: string): Promise<boolean>;
}
