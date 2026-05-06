import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,) {}

    @Post("/create")
    async createUser(@Body() body: any): Promise<any> {
        return await this.usersService.createUser(body);
    }
    @Get("/me")
    async getProfile(@Body() body: CreateUserDto): Promise<any> {
        return  await this.usersService.getUserProfile(body);
    }



}
