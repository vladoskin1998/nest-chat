import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
export declare class ChatAuthGuard implements CanActivate {
    private userService;
    private tokenService;
    private reflector;
    constructor(userService: UserService, tokenService: TokenService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
