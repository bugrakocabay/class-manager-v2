import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { compareData, hashData } from 'src/helpers/hash-data';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(body: CreateUserDto) {
    const { username, password } = body;
    const userInDb = await this.userRepo.findOne({ where: { username } });
    if (userInDb) throw new BadRequestException('username in user');

    const hashedPasswowrd = await hashData(password);
    const user = this.userRepo.create({ username, password: hashedPasswowrd });
    return this.userRepo.save(user);
  }

  async login(body: CreateUserDto) {
    const { username, password } = body;
    const userInDb = await this.userRepo.findOne({ where: { username } });
    if (!userInDb) throw new BadRequestException('invalid credentials');

    const passwordMatch = compareData(password, userInDb.password);
    if (!passwordMatch) throw new BadRequestException('invalid credentials');

    const token = await this.signToken(userInDb.id, userInDb.username);
    return { access_token: token };
  }

  async signToken(userId: number, username: string) {
    const payload = { userId, username };
    const token = this.jwtService.sign(payload, {
      secret: 'at-secret',
      expiresIn: 60 * 60 * 7,
    });

    return token;
  }
}
