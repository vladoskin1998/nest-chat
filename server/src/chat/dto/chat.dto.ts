import {  IsArray} from 'class-validator'
import { UUID } from 'sequelize'
import { Type } from 'class-transformer';

export class ListDto{
    @Type(() => UUID)
    sourceUserId: number
}

export class ChatDto extends ListDto{

    @Type(() => UUID)
    destinationUserId: number
}

