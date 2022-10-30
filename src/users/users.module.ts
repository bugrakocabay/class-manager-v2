import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtStrategy } from 'src/strategies/at-strategy';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: 'at-secret' }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, AtStrategy],
})
export class UsersModule {}
