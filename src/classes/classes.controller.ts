import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from 'src/decorators/get-current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { JwtAuthGuard } from 'src/users/guards/jwt-auth.guard';
import { ClassesService } from './classes.service';
import { ClassDto } from './dtos/class.dto';
import { CreateClassDto } from './dtos/create-class.dto';

@Controller('classes')
export class ClassesController {
  constructor(private classService: ClassesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Serialize(ClassDto)
  createClass(
    @Body() dto: CreateClassDto,
    @GetCurrentUser('sub') userId: number,
  ) {
    return this.classService.create(dto, userId);
  }
}
