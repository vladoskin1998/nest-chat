import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from '../../token/token.service';
import { AuthModel } from '../auth.model';
export declare class AuthHttpGuard implements CanActivate {
    private tokenService;
    private authModel;
    constructor(tokenService: TokenService, authModel: typeof AuthModel);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    authByAccessToken(token: string): Promise<boolean>;
}
