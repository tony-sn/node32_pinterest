import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }
  prisma = new PrismaClient();
  login(userLogin) {
    // TODO: write logic for login here

    let token = this.jwtService.signAsync(
      { data: 'data' },
      { secret: this.configService.get('KEY'), expiresIn: '15m' },
    );

    return token;
  }
  async signUp(userSignUp: User) {
    try {
      const { user_id, email, full_name, password, age } = userSignUp;
      const checkUser = await this.prisma.user.findFirst({ where: { email } });

      if (checkUser) {
        throw new Error('Existing User!');
      }

      const newUser: Prisma.userCreateInput = {
        user_id: Number(user_id),
        age,
        full_name,
        email,
        password: bcrypt.hashSync(password, 10),
      };

      await this.prisma.user.create({ data: newUser });
      const message = 'Signup successfully. Please sign in!';

      return {
        success: true,
        message,
        data: {
          user_id: newUser.user_id,
          age: newUser.age,
          full_name: newUser.full_name,
          email: newUser.email,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
