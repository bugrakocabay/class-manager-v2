import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Class } from './classes.entity';
import { CreateClassDto } from './dtos/create-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class) private classRepo: Repository<Class>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(body: CreateClassDto, userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    const newClass = this.classRepo.create({
      ...body,
      teacher: user.username,
    });
    newClass.user = user;

    return await this.classRepo.save(newClass);
  }
}
