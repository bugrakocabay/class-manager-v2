import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  registerUser(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  loginUser(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findUserWithId(@Param('id') id: number) {
    return this.usersService.findUser(id);
  }
}
