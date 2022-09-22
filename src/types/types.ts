import { Roles } from '../enum/enum'

export interface PayloadToken {
    email: string
    role?: Roles
}

export interface TokenModelI{
    refreshToken:string;
    accessToken:string;
}

export interface UserCreationAttrs {
    email: string;
    password: string;
    role: Roles
  }
  