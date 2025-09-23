import {
    Controller,
    Post,
    Body,
    UsePipes,
    HttpCode,
    ValidationPipe
} from '@nestjs/common'
import { UsersService } from './usersService'
import { CreateUserDto } from './create-user.dto'

@Controller('users')
export class UsersController {
    constructor( private readonly usersService: UsersService){}

    @Post('/signup')
    @HttpCode(201)
    @UsePipes(new ValidationPipe({whitelist: true}))
    async signUp(@Body() createUserDto: CreateUserDto) {

        console.log("Create,", createUserDto)
        const user = await this.usersService.create(createUserDto);
        return { success: true, user};
    }

}