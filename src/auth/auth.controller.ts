import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiProperty, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
// import { User } from './entities/user';

class User {
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

class UserLoginType {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiBody({
    type: UserLoginType,
    description: 'User Login',
  })
  @Post('/login')
  login(@Body() body: UserLoginType) {
    return this.authService.login(body);
  }

  @Post('/sign-up')
  async signUp(@Body() body: User) {
    return this.authService.signUp(body);
  }
}
