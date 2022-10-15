import { FindAuthType } from '../types/types';
import { UserModel } from './user.model';
import { AuthDto } from '../auth/dto/auth.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: typeof UserModel);
    createOrFindUser(authDto: AuthDto): Promise<[UserModel, boolean]>;
    getUserByDto(param: FindAuthType): Promise<UserModel>;
    getUsers(email?: string): Promise<UserModel[]>;
}
