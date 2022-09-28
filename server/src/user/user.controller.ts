import { Controller, UseGuards,Get,Query } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ){}
    
    // @UseGuards(AuthGuard)
    @Get('/search-user')
    async searchUser(
        @Query('email') 
        email: string
    ){
        console.log(email);
        
        const users = await this.userService.getUsers(email)
        return users
    }
}
