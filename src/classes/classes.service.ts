import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Class } from './classes.entity';
import { CreateClassDto } from './dtos/create-class.dto';
import { UpdateClassDto } from './dtos/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class) private classRepo: Repository<Class>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(body: CreateClassDto, userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('please login');

    const newClass = this.classRepo.create({
      ...body,
      teacher: user.username,
    });
    newClass.user = user;

    return await this.classRepo.save(newClass);
  }

  async update(id: number, body: UpdateClassDto) {
    const classInDb = await this.classRepo.findOne({ where: { id } });
    if (!classInDb) throw new BadRequestException('class does not exist');

    await this.classRepo.update(id, body);
    return this.classRepo.findOneOrFail({ where: { id } });
  }

  async deleteWithId(id: number) {
    const classInDb = await this.classRepo.findOne({ where: { id } });
    if (!classInDb) throw new BadRequestException('class does not exist');
    await this.classRepo.delete(id);

    return { statusCode: 200, message: 'deleted successfully' };
  }

  async findWithId(id: number) {
    const classInDb = await this.classRepo.findOne({ where: { id } });
    if (!classInDb) throw new BadRequestException('class does not exist');
    return await this.classRepo.findOne({ where: { id } });
  }

  async find() {
    const classInDb = await this.classRepo.find();
    if (classInDb.length === 0) return { message: 'such empty' };

    return classInDb;
  }
}
