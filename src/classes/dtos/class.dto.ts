import { Expose, Transform } from 'class-transformer';

export class ClassDto {
  @Expose()
  id: number;

  @Expose()
  class_name: string;

  @Expose()
  teacher: string;

  @Expose()
  status: string;

  @Expose()
  description: string;

  @Expose()
  created_at: string;

  @Expose()
  updated_at: string;

  @Expose()
  date: Date;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
