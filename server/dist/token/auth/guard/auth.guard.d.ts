import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';
import { UserModel } from '../user.model';
export declare class AuthGuard implements CanActivate {
    private tokenService;
    private userModel;
    constructor(tokenService: TokenService, userModel: typeof UserModel);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    authByAccessToken(token: string): Promise<boolean>;
}
