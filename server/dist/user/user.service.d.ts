import { AuthModel } from '../auth/auth.model';
export declare class UserService {
    private authModel;
    constructor(authModel: typeof AuthModel);
    getUsers(email?: string): Promise<AuthModel[]>;
}
