import { Class } from 'src/classes/classes.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from './enums/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ enum: UserRole, default: UserRole.admin })
  role: string;

  @OneToMany(() => Class, (classes) => classes.user)
  teacher_classes: Class[];

  @Column({ default: null })
  hashed_rt: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
