import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { ClassesModule } from './classes/classes.module';
import { Class } from './classes/classes.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Class],
      synchronize: true,
    }),
    UsersModule,
    ClassesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
