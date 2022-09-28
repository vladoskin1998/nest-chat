import { Roles } from '../../../enum/enum';
export declare class EmailDto {
    email: string;
}
export declare class UserDto extends EmailDto {
    password: string;
    role?: Roles;
}
