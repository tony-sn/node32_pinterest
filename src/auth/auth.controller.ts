import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './entities/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  login(@Body() body) {
    return this.authService.login(body);
  }

  @Post('/sign-up')
  async signUp(@Body() body: User) {
    try {
      const message = await this.authService.signUp(body);
      console.log('user input', body);
      return { success: true, message };
    } catch (error) {
      return { success: false, error: 'Existing user/email' };
    }
  }
}
