import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { user } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  getUser(): Promise<user[]> {
    return this.userService.getUser();
  }

  @Get('/:userId')
  getUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(Number(userId));
  }
}
