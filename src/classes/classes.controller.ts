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
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ClassesService } from './classes.service';
import { ClassDto } from './dtos/class.dto';
import { CreateClassDto } from './dtos/create-class.dto';
import { UpdateClassDto } from './dtos/update-class.dto';
import { RoleGuard } from 'src/common/guards/role-auth.guard';

@Controller('classes')
@UseGuards(JwtAuthGuard)
export class ClassesController {
  constructor(private classService: ClassesService) {}

  @Post()
  @Serialize(ClassDto)
  @UseGuards(RoleGuard)
  createClass(
    @Body() dto: CreateClassDto,
    @GetCurrentUser('sub') userId: number,
  ) {
    return this.classService.create(dto, userId);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  updateClass(@Param('id') id: string, @Body() dto: UpdateClassDto) {
    return this.classService.update(parseInt(id), dto);
  }

  @Get(':id')
  findClass(@Param('id') id: string) {
    return this.classService.findWithId(parseInt(id));
  }

  @Get()
  findAll() {
    return this.classService.find();
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  deleteClass(@Param('id') id: string) {
    return this.classService.deleteWithId(parseInt(id));
  }
}
