import { Roles } from '../enum/enum'


type PropertyUnion<T> = keyof T extends infer K
  ? K extends keyof T
      ? Record<K, T[K]>
      : never
  : never;

export interface PayloadToken {
  id: number,
  email: string
  role?: Roles
}

export interface TokenModelI {
  refreshToken: string
  accessToken: string
}

export interface UserCreationAttrs {
  email: string
  password: string
  role: Roles
}

export interface TargetChat {
  email: string,
  chatId: number
}

export interface AddMessage{
  message:string, 
  messageFromId:number, 
  currentChatId:number
}

export type RoomType = number | string
export type TokensType = PropertyUnion<TokenModelI>
export type FindAuthType = PropertyUnion<PayloadToken>
//export type TokensType = { refreshToken: string } | { accessToken: string }




