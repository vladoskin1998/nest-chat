import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    searchUser(email: string): Promise<import("./user.model").UserModel[]>;
}
