import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  user_id?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  avatar: string;
}
