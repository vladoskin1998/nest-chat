import { UsersService } from './auth.service';
import { UsersDto } from './userDto/users.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    registration(dto: UsersDto): Promise<import("./users.model").UsersModel>;
    login(): Promise<void>;
    refresh(): Promise<void>;
    delete(): Promise<void>;
}
