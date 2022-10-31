import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  class_name: string;

  @Column()
  date: Date;

  @Column()
  teacher: string;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.teacher_classes)
  user: User;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
