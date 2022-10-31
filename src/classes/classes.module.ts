import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { ClassesController } from './classes.controller';
import { Class } from './classes.entity';
import { ClassesService } from './classes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Class, User])],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
