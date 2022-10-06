import { Controller, UseGuards,Get,Query } from '@nestjs/common';
import { AuthHttpGuard } from '../auth/guard/auth-http.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ){}
    
    @UseGuards(AuthHttpGuard)
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
