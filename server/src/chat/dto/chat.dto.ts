import {  IsArray} from 'class-validator'
import { UUID } from 'sequelize'
import { Type } from 'class-transformer';

export class ChatDto{
    @IsArray()
    @Type(() => UUID)
    usersId: number[]
}

export class ListDto{
    @Type(() => UUID)
    userId: number
}
