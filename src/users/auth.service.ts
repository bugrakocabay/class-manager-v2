import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { compareData, hashData } from 'src/common/helpers/hash-data';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(body: CreateUserDto) {
    const { username, password, role } = body;
    const userInDb = await this.userRepo.findOne({ where: { username } });
    if (userInDb) throw new BadRequestException('username in use');

    const hashedPasswowrd = await hashData(password);
    const user = this.userRepo.create({
      username,
      password: hashedPasswowrd,
      role,
    });
    return this.userRepo.save(user);
  }

  async login(body: CreateUserDto) {
    const { username, password } = body;
    const userInDb = await this.userRepo.findOne({ where: { username } });
    if (!userInDb) throw new BadRequestException('invalid credentials');

    const passwordMatch = compareData(password, userInDb.password);
    if (!passwordMatch) throw new BadRequestException('invalid credentials');

    const token = await this.signToken(
      userInDb.id,
      userInDb.username,
      userInDb.role,
    );
    return { access_token: token };
  }

  async signToken(userId: number, username: string, role: string) {
    const payload = { userId, username, role };

    const token = this.jwtService.sign(payload, {
      secret: 'at-secret',
      expiresIn: 60 * 60 * 24,
    });

    return token;
  }
}
