import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findUser(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new BadRequestException('user not found');

    return user;
  }

  async findAll() {
    const users = await this.userRepo.find();
    if (users.length === 0) return { message: 'such empty' };

    return users;
  }

  async updateOne(id: number, body: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new BadRequestException('user not found');

    user.username = body.username;
    return await this.userRepo.save(user);
  }

  async deleteOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new BadRequestException('user not found');

    await this.userRepo.delete(user.id);
    return { statusCode: 200, message: 'deleted successfully' };
  }
}
