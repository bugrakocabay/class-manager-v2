import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  @Serialize(UserDto)
  registerUser(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  loginUser(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @Get(':id')
  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  findUserWithId(@Param('id') id: string) {
    return this.usersService.findUser(parseInt(id));
  }

  @Get()
  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateOne(parseInt(id), dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteOne(parseInt(id));
  }
}
