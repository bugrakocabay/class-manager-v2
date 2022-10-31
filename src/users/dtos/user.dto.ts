import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  access_token: string;

  @Expose()
  role: string;
}
