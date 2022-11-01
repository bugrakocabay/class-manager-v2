import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleGuard } from 'src/common/guards/role-auth.guard';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { ClassesController } from './classes.controller';
import { Class } from './classes.entity';
import { ClassesService } from './classes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Class, User])],
  controllers: [ClassesController],
  providers: [ClassesService, UsersService, RoleGuard],
})
export class ClassesModule {}
